require 'rails_helper'

RSpec.describe WebhookConfiguration, type: :model do
  it "has a valid factory" do
    config = build(:webhook_configuration)
    expect(config).to be_valid
  end

  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :url }
  it { is_expected.to validate_presence_of :type }

  describe "criteria validations" do
    it "must have at least one" do
      config = build(:webhook_configuration, criteria: [])
      expect(config).to_not be_valid
      error = config.errors.full_messages_for(:criteria).first
      expect(error).to match(/at least one/)
    end

    it "must have an attribute" do
      config = build(:webhook_configuration, criteria: [{
        operator: "changes_to",
        value: "testing"
      }])
      expect(config).to_not be_valid
      error = config.errors.full_messages_for(:criteria).first
      expect(error).to match(/attribute/)
    end

    it "must have an operator" do
      config = build(:webhook_configuration, criteria: [{
        attribute: "status",
        value: "testing"
      }])
      expect(config).to_not be_valid
      error = config.errors.full_messages_for(:criteria).first
      expect(error).to match(/operator/)
    end

    it "must have a valid operator" do
      config = build(:webhook_configuration, criteria: [{
        operator: "invalid",
        attribute: "status",
        value: "testing"
      }])
      expect(config).to_not be_valid
      error = config.errors.full_messages_for(:criteria).first
      expect(error).to match(/not a supported operator/)
    end

    it "must have a value" do
      config = build(:webhook_configuration, criteria: [{
        attribute: "status",
        operator: "changes_to"
      }])
      expect(config).to_not be_valid
      error = config.errors.full_messages_for(:criteria).first
      expect(error).to match(/value/)
    end
  end

  describe "#process" do
    context "when criteria matches" do
      it "creates and schedules a webhook record" do
        booking = create(:booking, status: 'Accepted');

        config = WebhookConfiguration::Booking.new(criteria: [{
          attribute: 'status',
          operator: 'changes_to',
          value: 'Accepted'
        }])

        expect(WebhookJob).to receive(:perform_later)

        expect {
          config.process(booking)
        }.to change { Webhook.count }.by(1)
      end
    end

    context "when criteria does not match" do
      it "does not create a webhook record" do
        booking = create(:booking, status: 'Declined');

        config = WebhookConfiguration::Booking.new(criteria: [{
          attribute: 'status',
          operator: 'changes_to',
          value: 'Accepted'
        }])

        expect(WebhookJob).to_not receive(:perform_later)

        expect {
          config.process(booking)
        }.to_not change { Webhook.count }
      end
    end
  end

  describe "#data" do
    context "when instance is base WebhookConfiguration" do
      it "raises NotImplemented" do
        config = WebhookConfiguration.new
        booking = Booking.new
        expect { config.data(booking) }.to raise_error(NotImplementedError)
      end
    end
  end
end
