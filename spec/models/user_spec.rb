# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  include_examples "uid"

  it "has a valid factory" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "removes any availability in the past before saving" do
    user = create(:user)
    a = 1.day.ago.change({hour: 10, min: 0, sec: 0})
    b = 1.day.from_now.change({hour: 10, min: 0, sec: 0})
    user.availability = [a, b]
    expect(user.availability).to include(a)
    user.save
    expect(user.availability).not_to include(a)
    expect(user.availability).to include(b)
  end

  describe "#send_confirmation_email" do
    let(:user) { build(:user) }
    let(:mail) { double('email') } # rubocop:disable RSpec/VerifiedDoubles

    it "sets the confirmation_digest" do
      expect(user.account.confirmation_digest).to be_nil
      user.send_confirmation_email
      expect(user.account.reload.confirmation_digest).not_to be_nil
    end

    it 'sends the confirmation email' do
      expect(mail).to receive(:deliver_later)
      allow(UserMailer).to receive(:confirm).and_return(mail)
      user.send_confirmation_email
    end
  end

  describe '#company_name' do
    context "when the user has a client record" do
      it "returns the clients name" do
        client = create(:client, name: "Test Corp")
        user = create(:user, client: client)
        expect(user.company_name).to eq(client.name)
      end
    end

    context 'when the user has no client record' do
      it "returns the clients name" do
        user = create(:user, client: nil, company_name: "Test Company")
        expect(user.company_name).to eq("Test Company")
      end
    end
  end

  describe "#invite_comember!" do
    let(:user) { create(:user) }
    let(:new_account) { create(:account) }

    before { allow_any_instance_of(described_class).to receive(:sync_to_airtable) }

    it "creates a user on the new account" do
      expect(new_account.user).to be_nil
      user.invite_comember!(new_account)
      expect(new_account.user).not_to be_nil
    end

    it "copies all the stuff over" do
      new_user = user.invite_comember!(new_account)
      expect(user.attributes.slice("company_id", "company_name", "sales_person_id")).to match_array(new_user.attributes.slice("company_id", "company_name", "sales_person_id"))
    end

    it "sync with airtable" do
      expect_any_instance_of(described_class).to receive(:sync_to_airtable)
      user.invite_comember!(new_account)
    end
  end

  describe "#disable!" do
    let(:user) { create(:user) }
    let(:actor) { create(:account) }

    it "sets the status to disabled and syncs" do
      allow_any_instance_of(TalkjsApi).to receive(:conversations_by).and_return([])
      expect(user).to receive(:sync_to_airtable)

      user.disable!(actor.id)
      user.reload
      expect(user.account.deleted_at).to be_nil
      expect(user.application_status).to eq("Disabled")
      expect(user.reload_log_data.responsible_id).to eq(actor.id)
    end
  end
end
