class Slack
  URL = 'https://slack.com/api/'

  HEADERS = {
    'Authorization': "Bearer #{ENV['SLACK_BOT_TOKEN']}",
    'Content-type': 'application/json; charset=utf-8'
  }

  def self.api
    @faraday ||= Faraday.new(URL, headers: HEADERS)
  end

  def self.message(options = {})
    return if ENV['SLACK_BOT_TOKEN'].nil?
    api.post('chat.postMessage', options.to_json)
  end
end
