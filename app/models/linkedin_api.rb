class LinkedinApi
  class RequestError < StandardError
    def initialize(response)
      response_log = [
        "Something went wrong with the LinkedIn API request.",
        "Status: #{response.status}.",
        "URL: #{response.env.url}",
        "Request body: #{JSON[response.env.request_body]}",
        "Headers: #{response.headers}.",
        "Body: #{response.body}"
      ]
      Rails.logger.error(response_log.join("\n"))
      Raven.extra_context(response: response_log)
      super(response_log.take(2).join(' '))
    end
  end

  API_ROOT = "https://api.linkedin.com/v2/".freeze

  attr_reader :token

  def initialize
    linkedin_ad_auth_provider = AuthProvider.linkedin_ads.first!
    linkedin_ad_auth_provider.refresh_linkedin_token!
    @token = linkedin_ad_auth_provider.token
  end

  def post_request(path, params, expected_status: 201)
    response = Faraday.post(API_ROOT + path, params.to_json, request_headers)
    if response.status == expected_status
      response
    else
      raise RequestError.new(response)
    end
  end

  def put_request(path, params, expected_status: 204)
    response = Faraday.put(API_ROOT + path, params.to_json, request_headers_v2)
    if response.status == expected_status
      response
    else
      raise RequestError.new(response)
    end
  end

  def get_request(path, expected_status: 200)
    response = Faraday.get(API_ROOT + path, nil, request_headers_v2)
    if response.status == expected_status
      response
    else
      raise RequestError.new(response)
    end
  end

  [:post_request, :put_request, :get_request].each do |method|
    define_method "#{method}_with_retries" do |*args, **options|
      with_retries(options.slice(:max_retries)) do
        public_send(method, *args, **options.except(:max_retries))
      end
    end
  end

  private

  def with_retries(max_retries: 3)
    retries = 1
    begin
      yield
    rescue RequestError => e
      if retries <= max_retries
        retries += 1
        sleep 2**retries
        retry
      else
        raise
      end
    end
  end

  def request_headers
    {
      "Connection" => "Keep-Alive",
      "Authorization" => "Bearer #{token}",
      "Content-Type" => "application/json",
      "Accept" => "application/json"
    }
  end

  def request_headers_v2
    request_headers.merge({"X-Restli-Protocol-Version" => "2.0.0"})
  end
end
