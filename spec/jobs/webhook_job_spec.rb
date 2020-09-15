require "rails_helper"

RSpec.describe WebhookJob do
  let(:webhook) { create(:webhook, status: "pending") }

  describe "#perform_later" do
    it "enqueues a webhook" do
      expect { WebhookJob.perform_later(webhook.id).to have_enqueued_job }
    end
  end

  it "makes a request to the webhook url with the stored data" do
    stub_request(:post, webhook.url)
    WebhookJob.new.perform(webhook.id)
    expect(WebMock).to have_requested(:post, webhook.url).with(body: webhook.data)
  end

  context "when the request fails" do
    it "sets the status to 'failed'" do
      allow_any_instance_of(Faraday::Connection).to receive(:post)
        .and_raise(Faraday::ConnectionFailed, "message body")
      expect {
        WebhookJob.new.perform(webhook.id)
      }.to change {
        webhook.reload.status
      }.from("pending").to("failed")
    end

    it "stores the response" do
      allow_any_instance_of(Faraday::Connection).to receive(:post)
        .and_raise(Faraday::ConnectionFailed, "message body")
        WebhookJob.new.perform(webhook.id)
        expect(webhook.reload.response).to eq({
          status: "500",
          body: "message body"
        })
    end
  end
end