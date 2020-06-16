require 'multi_json'
require 'jwt'
require 'faraday'

# Schedules a video call with a third-party web service
#
# For now, we use Zoom via the JWT authentication.
# See: https://marketplace.zoom.us/docs/guides/auth/jwt
class CallScheduleJob < ApplicationJob
  queue_as :default

  ZOOM_MEETINGS_ENDPOINT = 'https://api.zoom.us/v2/users/%s/meetings'

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
      response = zoom_create_meeting(specialist, api_key)

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
      status: Interview.statuses[:schduled]
    )

    InterviewMailer.schduled(interview, interview.user, interview.specialist)
      .deliver_later
    InterviewMailer.schduled(interview, interview.specialist, interview.user)
      .deliver_later

    InterviewMailer.reminder(interview, interview.user, interview.specialist)
      .deliver_later(wait_until: interview.starts_at - 1.hour)
    InterviewMailer.reminder(interview, interview.specialist, interview.user)
      .deliver_later(wait_until: interview.starts_at - 1.hour)
  end

  private

  # Sends a request to create a new ZOOM meeting
  #
  # @param specialist [Specialist] the user/host to lead the meeting
  # @param api_key [String] the ZOOM API key to be used
  # @return [Faraday::Response]
  def zoom_create_meeting(specialist, api_key)
    url = ZOOM_MEETINGS_ENDPOINT % specialist.uid
    headers = {
      'Authorization': "Bearer: #{zoom_jwt(api_key)}",
      'Content-type': Mime[:json].to_s
    }

    Faraday.post(url, { userId: specialist.email }.to_json, headers)
  end

  # Generates a ZOOM API JWT token
  #
  # @param api_key [String] the API key to use
  # @return [String]
  def zoom_jwt(api_key)
    JWT.generate(iss: api_key, exp: 1.minute.since)
  end

  # Returns a list of ZOOM API keys
  #
  # @return [Array]
  def zoom_api_keys
    @parsed_zoom_api_keys ||= ENV['ZOOM_API_KEYS'].to_s.split(',').compact
  end
end
