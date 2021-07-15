# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(User, type: :model) do
  let(:user) { create(:user) }

  include_examples "uid"

  it "has a valid factory" do
    expect(build(:user)).to be_valid
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
      expect_any_instance_of(described_class).to receive(:sync_to_airtable)
      user.invite_comember!(new_account)
    end

    it "creates a case study search" do
      user.company.update(goals: %w[one two])
      new_user = user.invite_comember!(new_account)
      search = ::CaseStudy::Search.find_by(user: new_user)
      expect(search.business_type).to eq(user.company.kind)
      expect(search.goals).to eq(%w[one two])
      expect(search.name).to eq("Recommendations for #{user.company.name}")
    end
  end

  describe "#create_company_recomendation_search" do
    it "creates one with goals and company name" do
      user.company.update(goals: %w[one two])
      search = user.create_company_recomendation_search
      expect(search.goals).to match_array(%w[one two])
      expect(search.business_type).to eq("Startup")
      expect(search.name).to eq("Recommendations for Test Company")
      expect(search.company_recomendation).to be_truthy
    end
  end

  describe "#disable!" do
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
end
