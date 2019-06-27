require 'rails_helper'

describe WebhookEvent do
  it "has a valid factory" do
    event = build(:webhook_event)
    expect(event).to be_valid
  end

  describe "self.trigger" do
    it "triggers webhooks for any webhook_event records matching that event" do
      event = create(:webhook_event, url: "https://localhost:3000/1")
      allow_any_instance_of(Webhook).to receive(:id).and_return(1234)
      data = { test: "data" }
      expect(Webhook).to receive(:create).with({
        url: event.url,
        data: data
      })
      WebhookEvent.trigger(event.event, data)
    end

    it 'raises an error if the event doesnt exist' do
      expect {
        WebhookEvent.trigger("testing.not_an_event")
      }.to raise_error(WebhookEvent::Error, /not a valid event/)
    end
  end
end
