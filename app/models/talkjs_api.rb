# frozen_string_literal: true

class TalkjsApi
  API_ROOT = "https://api.talkjs.com/v1/#{ENV["TALKJS"]}/"

  def messages(conversation_id)
    get_request("conversations/#{conversation_id}/messages")
  end

  def conversations_by(user_id)
    get_request("users/#{user_id}/conversations")
  end

  def leave_conversation(conversation_id, user_id)
    delete_request("conversations/#{conversation_id}/participants/#{user_id}")
  end

  private

  def get_request(url)
    response = Faraday.get(API_ROOT + url, nil, request_headers)
    raise ApiRequestError, response unless response.status == 200

    JSON[response.body]["data"]
  end

  def delete_request(url)
    response = Faraday.delete(API_ROOT + url, nil, request_headers)
    raise ApiRequestError, response unless response.status == 200

    JSON[response.body]
  end

  def request_headers
    {
      "Authorization" => "Bearer #{ENV["TALKJS_SECRET"]}",
      "Content-Type" => "application/json",
      "Accept" => "application/json"
    }
  end
end
