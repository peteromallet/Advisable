# frozen_string_literal: true

require "rails_helper"

RSpec.describe Airtable::ClientContact do
  describe "push_data" do
    let(:user) { create(:user) }
    let(:airtable) { described_class.new({}, id: user.airtable_id) }

    before do
      allow(airtable).to receive(:save)
    end

    it "syncs the email" do
      expect { airtable.push(user) }.to change {
        airtable.fields["Email Address"]
      }.from(nil).to(user.account.email)
    end

    it "syncs the first_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields["First Name"]
      }.from(nil).to(user.account.first_name)
    end

    it "syncs the last_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields["Last Name"]
      }.from(nil).to(user.account.last_name)
    end

    it "syncs the country" do
      expect { airtable.push(user) }.to change {
        airtable.fields["Country"]
      }.from(nil).to([user.country.airtable_id])
    end
  end
end
