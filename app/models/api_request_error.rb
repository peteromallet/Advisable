class ApiRequestError < StandardError
  attr_reader :response_log, :backtrace

  def initialize(response)
    @response_log = {
      status: response.status,
      url: response.env.url,
      request_body: JSON[response.env.request_body],
      headers: response.headers,
      body: response.body
    }
    @backtrace = caller

    Rails.logger.error(response_log)
    super("Something went wrong with the API request. Status #{response.status}")
  end
end
