# frozen_string_literal: true

class TalkjsApi
  API_ROOT = "https://api.talkjs.com/v1/#{ENV["TALKJS"]}/"

  def messages(conversation_id, starting_after_id = nil)
    starting_after = starting_after_id.nil? ? "" : "&startingAfter=#{starting_after_id}"

    get_request("conversations/#{conversation_id}/messages?limit=3#{starting_after}")
  end

  def conversations(starting_after_id = nil)
    starting_after = starting_after_id.nil? ? "" : "&startingAfter=#{starting_after_id}"
    get_request("conversations?limit=20#{starting_after}")
  end

  def conversations_by(user_id)
    get_request("users/#{user_id}/conversations")
  end

  def leave_conversation(conversation_id, user_id)
    delete_request("conversations/#{conversation_id}/participants/#{user_id}")
  end

  private

  def get_request(url)
    retries = 1
    response = Faraday.get(API_ROOT + url, nil, request_headers)
    case response.status
    when 200
      JSON[response.body]["data"]
    when 429
      raise ApiRequestError, response if retries > 2

      retries += 1
      puts response.headers
      # maybe? sleep(response.headers["Retry-After"])
      sleep 2**retries
      get_request(url)
    else
      raise ApiRequestError, response
    end
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
