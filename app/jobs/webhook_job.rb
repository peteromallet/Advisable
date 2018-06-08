class WebhookJob < ApplicationJob
  queue_as :default

  def perform(id)
    webhook = Webhook.find(id)
    conn = Faraday.new
    response = conn.post(webhook.url, webhook.data)
    webhook.update_columns(
      status: response.success? ? "successful" : "failed",
      response: {
        status: response.status,
        body: response.body
      }
    )
  rescue Faraday::ConnectionFailed => e
    webhook.update_columns(
      status: "failed",
      response: {
        status: "500",
        body: e.message
      }
    )
  end
end
