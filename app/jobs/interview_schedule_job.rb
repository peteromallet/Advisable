require 'multi_json'
require 'jwt'
require 'faraday'

# Schedules a video call with a third-party web service
#
# For now, we use Zoom via the JWT authentication.
# See: https://marketplace.zoom.us/docs/guides/auth/jwt
class InterviewScheduleJob < ApplicationJob
  queue_as :default

  ZOOM_API_URL = 'https://api.zoom.us/'
  ZOOM_USERS_ENDPOINT = ZOOM_API_URL + 'v2/users'
  ZOOM_MEETINGS_ENDPOINT = ZOOM_API_URL + 'v2/users/%s/meetings'

  # Main job entry point
  #
  # @param interview [Interview] carries the call participants
  # @return nil
  def perform(interview)
    return if interview.zoom_meeting_id.present?

    specialist = interview.application.specialist
    user = interview.user
    zoom_data = nil

    zoom_api_keys.each_with_index do |api_key, pos|
      response = zoom_create_meeting(user, api_key)

      # Raise an error to self-retry the job if no more API keys are left.
      if pos == zoom_api_keys.length && !response.success?
        raise StandardError(response.body)
      end

      next unless response.success?

      zoom_data = MultiJson.load(response.body)

      break
    end

    interview.update!(
      zoom_meeting_id: zoom_data['id'],
      status: Interview::STATUSES[:schduled]
    )

    InterviewMailer.scheduled(interview, user, specialist).deliver_later
    InterviewMailer.scheduled(interview, specialist, user).deliver_later

    InterviewMailer.reminder(interview, user, specialist)
      .deliver_later(wait_until: interview.starts_at - 1.hour)
    InterviewMailer.reminder(interview, specialist, user)
      .deliver_later(wait_until: interview.starts_at - 1.hour)
  end

  private

  # Light wrapper to force [Faraday] raise errors
  #
  # @return [Faraday::Connection]
  def api_client
    @faraday ||= Faraday.new do |f|
      f.use Faraday::Response::RaiseError
      f.use Faraday::Adapter::NetHttp
    end
  end

  # Sends a request to create a new ZOOM meeting
  #
  # @param user [User] the user/host to lead the meeting
  # @param api_key [String] the ZOOM API key to be used
  # @return [Faraday::Response]
  def zoom_create_meeting(user, api_key)
    headers = {
      'Authorization': "Bearer #{zoom_jwt(api_key)}",
      'Content-type': Mime[:json].to_s
    }

    resp = api_client.get(ZOOM_USERS_ENDPOINT, {}, headers)

    userId = MultiJson.load(resp.body)['users'].first['id']
    url = ZOOM_MEETINGS_ENDPOINT % userId

    api_client.post(url, { schdule_for: user.email }.to_json, headers)
  end

  # Generates a ZOOM API JWT token
  #
  # The key includes also the secret, `@` is used to separate the two.
  #
  # @param api_key [String] the API key to use
  # @return [String]
  def zoom_jwt(api_key)
    zkey, zsecret = api_key.split('@')

    JWT.encode({iss: zkey, exp: 1.minute.since.to_i}, zsecret)
  end

  # Returns a list of ZOOM API keys
  #
  # @return [Array]
  def zoom_api_keys
    @parsed_zoom_api_keys ||= ENV['ZOOM_API_KEYS'].to_s.split(',').compact
  end
end
