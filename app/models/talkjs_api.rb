class TalkjsApi
  API_ROOT = "https://api.talkjs.com/v1/#{ENV["TALKJS"]}/".freeze

  def messages(conversation_id)
    response = Faraday.get(API_ROOT + "conversations/#{conversation_id}/messages", nil, request_headers)
    if response.status == 200
      JSON[response.body]["data"]
    else
      raise ApiRequestError.new(response)
    end
  end

  private

  def request_headers
    {
      "Authorization" => "Bearer #{ENV["TALKJS_SECRET"]}",
      "Content-Type" => "application/json",
      "Accept" => "application/json"
    }
  end
end
