require 'faraday'

# Creates a conversation using the Talk.js API
#
# See: https://talkjs.com/docs/Reference/REST_API/index.html
class InterviewChatJob < ApplicationJob
  queue_as :default

  ENDPOINT = "https://api.talkjs.com/v1/#{ENV['TALKJS_APP_ID']}"
  USERS_ENDPOINT = ENDPOINT + '/users/%s'
  CONVERSATIONS_ENDPOINT = ENDPOINT + '/conversations/%s'
  MESSAGES_ENDPOINT = CONVERSATIONS_ENDPOINT + '/messages'

  SUBJECT = '%s 👋 %s'
  # TODO: Provide a proper introduction message...
  INTRO = 'Hi there...'
  HEADERS = {
    'Authorization': "Bearer: #{ENV['TALKJS_SECRET_KEY']}",
    'Content-type': Mime[:json].to_s
  }

  # Main job entry point
  #
  # @param interview [Interview] carries the conversation participants
  # @return nil
  def perform(interview)
    specialist = interview.application.specialist
    user = interview.user

    update_user(specialist) &&
      update_user(user) &&
      update_user(user.sale_person) &&
      create_conversation(interview.airtable_id, specialist, user) &&
      send_message(interview.airtable_id)
  end

  private

  # Light wrapper to force [Faraday] raise errors
  #
  # @return [Faraday::Connection]
  def api_client
    @faraday ||= Faraday.new do |f|
      f.use Faraday::Response::RaiseError
    end
  end

  # Sends a request to create a new Talk.js conversation message
  #
  # @param conversation_id [String] the conversation unique ID
  # @return [Faraday::Response]
  def send_message(conversation_id)
    url = MESSAGES_ENDPOINT % conversation_id
    data = [ { text: INTRO } ]

    api_client.post(url, data.to_json, headers)
  end

  # Sends a request to create a new Talk.js conversation
  #
  # @param conversation_id [String] the conversation unique ID
  # @param specialist [Specialist] the specialist to lead the conversation
  # @param user [User] the user conversation participant
  # @return [Faraday::Response]
  def create_conversation(conversation_id, specialist, user)
    url = CONVERSATIONS_ENDPOINT % conversation_id
    data = {
      participants: [
        specialist.airtable_id,
        user.airtable_id,
        sale_person.airtable_id
      ],
      subject: SUBJECT % [user.first_name, specialist.first_name]
    }

    api_client.put(url, data.to_json, headers)
  end

  # Sends a request to update/sync a new Talk.js user
  #
  # @param user [User] the data to sync to the conversation participant
  # @return [Faraday::Response]
  def update_user(user)
    data = { name: user.first_name, email: user.email }

    api_client.put((USERS_ENDPOINT % user.airtable_id), data.to_json, HEADERS)
  end
end
