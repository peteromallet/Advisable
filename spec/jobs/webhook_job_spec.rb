require "rails_helper"

describe WebhookJob do
  let(:webhook) { create(:webhook) }

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
end