# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Account, type: :model do
  let(:factory) { described_class.to_s.underscore.to_sym }

  include_examples "uid"

  it { is_expected.to have_secure_password }
  it { is_expected.to allow_value("test+2@test.com").for(:email) }
  it { is_expected.not_to allow_value("test+2test.com").for(:email) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to validate_length_of(:password).is_at_least(8) }

  it "has a valid factory" do
    account = build(:account)
    expect(account).to be_valid
  end

  describe "#has_password?" do
    it "returns true when there is a password_digest" do
      inst = create(factory, password: "testing123")
      expect(inst).to have_password
    end

    it "returns false when there is no passworrd_digest" do
      inst = create(factory, password: nil)
      expect(inst).not_to have_password
    end
  end

  describe "#name" do
    it "outputs the full name" do
      account = described_class.new(first_name: "Tom", last_name: "Cullen")
      expect(account.name).to eq("Tom Cullen")
    end
  end

  describe "permissions" do
    it "has a permissions attribute" do
      inst = create(:account)
      expect(inst.permissions).to be_an(Array)
    end
  end

  describe "#admin?" do
    it "returns true if the user is admin" do
      inst = build(:account, permissions: ["admin"])
      expect(inst).to be_admin
    end

    it "returns false if the user doesn't have a given permission" do
      inst = build(:account, permissions: [])
      expect(inst).not_to be_admin
    end
  end

  describe "#disable!" do
    let(:account) { create(:account) }
    let(:specialist) { create(:specialist, account: account) }

    it "resets password and changes email, and sets disabled_at timestamp" do
      email = account.email
      password = account.password
      account.disable!
      expect(account.deleted_at).to be_nil
      expect(account.disabled_at).not_to be_nil
      expect(account.password).not_to eq(password)
      expect(account.email).to eq("disabled+#{email.sub("@", ".at.")}@advisable.com")
    end

    it "only changes email once" do
      email = account.email
      account.disable!
      account.disable!
      account.disable!
      expect(account.email).to eq("disabled+#{email.sub("@", ".at.")}@advisable.com")
    end

    it "sets deleted_at and disabled_at when delete: true" do
      account.disable!(delete: true)
      expect(account.disabled_at).not_to be_nil
      expect(account.deleted_at).not_to be_nil
    end

    it "deletes magic links" do
      magic_link = create(:magic_link, account: account)
      account.disable!
      expect(MagicLink.where(id: magic_link.id)).to be_empty
    end
  end
end
