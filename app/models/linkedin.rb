class Linkedin
  class RequestError < StandardError
    def initialize(response)
      response_log = [
        "Something went wrong with the LinkedIn API request.",
        "Status: #{response.status}.",
        "Headers: #{response.headers}.",
        "Body: #{response.body}"
      ]
      Rails.logger.error(response_log.join("\n"))
      super(response_log.take(2).join(' '))
    end
  end

  API_ROOT = "https://api.linkedin.com/v2/".freeze

  attr_reader :token

  def initialize(token)
    @token = token
  end

  def post_request(path, params, expected_status = 201)
    response = Faraday.post(API_ROOT + path, params.to_json, request_headers)

    if response.status == expected_status
      response
    else
      raise RequestError.new(response)
    end
  end

  private

  def request_headers
    {
      "Connection" => "Keep-Alive",
      "Authorization" => "Bearer #{token}",
      "Content-Type" => "application/json",
      "Accept" => "application/json"
    }
  end
end
