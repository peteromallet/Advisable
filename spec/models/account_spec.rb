require 'rails_helper'

RSpec.describe Account, type: :model do
  include_examples "uid"

  it { is_expected.to have_secure_password }
  it { is_expected.to allow_value("test+2@test.com").for(:email) }
  it { is_expected.to_not allow_value("test+2test.com").for(:email) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to validate_length_of(:password).is_at_least(8) }

  let(:factory) { described_class.to_s.underscore.to_sym }

  describe "#has_password?" do
    it "returns true when there is a password_digest" do
      inst = create(factory, password: "testing123")
      expect(inst.has_password?).to be_truthy
    end

    it "returns false when there is no passworrd_digest" do
      inst = create(factory, password: nil)
      expect(inst.has_password?).to be_falsey
    end
  end

  it "has a valid factory" do
    account = build(:account)
    expect(account).to be_valid
  end

  describe "permissions" do
    it "has a permissions attribute" do
      inst = create(:account)
      expect(inst.permissions).to be_an(Array)
    end

    it "is invalid if it has an unknown permission" do
      inst = build(:account, permissions: ["doesnt:exist"])
      expect(inst).to_not be_valid
      expect(inst.errors.full_messages.first).to match(/not a valid permission/)
    end
  end

  describe "#has_permission?" do
    it "returns true if the user has a given permission" do
      inst = build(:account, permissions: ["admin"])
      expect(inst.has_permission?("admin")).to be_truthy
    end

    it "returns false if the user doesn't have a given permission" do
      inst = build(:account, permissions: [])
      expect(inst.has_permission?("admin")).to be_falsey
    end
  end
end
