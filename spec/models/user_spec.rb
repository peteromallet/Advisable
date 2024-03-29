# frozen_string_literal: true

require "rails_helper"

RSpec.describe(User, type: :model) do
  let(:user) { create(:user) }

  include_examples "uid"

  it "has a valid factory" do
    expect(build(:user)).to be_valid
  end

  describe "#name_with_company" do
    let(:account) { create(:account, first_name: "Bob", last_name: "Vance") }
    let(:company) { create(:company, name: "Vance Refrigeration") }
    let(:user) { create(:user, account:, company:) }

    it "includes company" do
      expect(user.name_with_company).to eq("Bob Vance from Vance Refrigeration")
    end

    context "when company name is blank" do
      let(:company) { create(:company, name: "") }

      it "does not include company" do
        expect(user.name_with_company).to eq("Bob Vance")
      end
    end

    context "when company is nil" do
      it "does not include company" do
        user.update_columns(company_id: nil) # rubocop:disable Rails/SkipsModelValidations
        expect(user.name_with_company).to eq("Bob Vance")
      end
    end
  end

  describe "#send_confirmation_email" do
    let(:mail) { double("email") } # rubocop:disable RSpec/VerifiedDoubles

    it "sets the confirmation_digest" do
      expect(user.account.confirmation_digest).to be_nil
      user.send_confirmation_email
      expect(user.account.reload.confirmation_digest).not_to be_nil
    end

    it "sends the confirmation email" do
      expect(mail).to receive(:deliver_later)
      allow(UserMailer).to receive(:confirm).and_return(mail)
      user.send_confirmation_email
    end
  end

  describe "#invite_comember!" do
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
      expect_any_instance_of(described_class).to receive(:bg_sync_to_airtable)
      user.invite_comember!(new_account)
    end
  end

  describe "#disable!" do
    let(:actor) { create(:account) }

    it "sets the status to disabled and syncs" do
      user.disable!(actor.id)
      user.reload
      expect(user.account.deleted_at).to be_nil
      expect(user.application_status).to eq("Disabled")
      expect(user.reload_log_data.responsible_id).to eq(actor.id)
      expect(AirtableSyncJob).to have_been_enqueued.with(user, anything)
    end
  end

  describe "#transfer_to_company!" do
    let(:company) { create(:company) }

    it "updates the company id" do
      old_company_id = user.company_id
      expect(old_company_id).not_to eq(company.id)
      expect(user.account).not_to be_team_manager
      user.transfer_to_company!(company)
      expect(user.company_id).to eq(company.id)
      expect(user.account).to be_team_manager
      expect(Company.where(id: old_company_id)).not_to be_empty
    end

    context "when destroy param" do
      it "deletes the old company" do
        old_company_id = user.company_id
        user.transfer_to_company!(company, destroy: true)
        expect(user.company_id).to eq(company.id)
        expect(Company.where(id: old_company_id)).to be_empty
      end
    end

    context "when passed same company id" do
      it "raises an error" do
        expect { user.transfer_to_company!(user.company) }.to raise_error("What are you even doing?")
      end
    end
  end

  describe "timestamps" do
    it "sets accepted_at to new factory record but leaves the others" do
      expect(user.application_accepted_at).not_to be_nil
      expect(user.submitted_at).to be_nil
      expect(user.invited_to_interview_at).to be_nil
    end

    it "does not touch the timestamp if status didn't change" do
      timestamp = user.application_accepted_at.to_i
      user.update(application_status: "Submitted")
      expect(user.reload.application_accepted_at.to_i).to eq(timestamp)
      user.update(campaign_name: "New campaign")
      expect(user.reload.application_accepted_at.to_i).to eq(timestamp)
    end

    it "handles all the timestamps" do
      expect(user.reload.application_accepted_at).not_to be_nil
      user.update(application_status: "Submitted")
      expect(user.reload.submitted_at).not_to be_nil
      user.update(application_status: "Invited To Interview")
      expect(user.reload.invited_to_interview_at).not_to be_nil
    end
  end
end
