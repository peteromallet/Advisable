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
end
