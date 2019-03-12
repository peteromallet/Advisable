require "rails_helper"

describe Airtable::ClientContact do
  include_examples "sync airtable column", "First Name", to: :first_name
  include_examples "sync airtable column", "Last Name", to: :last_name
  include_examples "sync airtable column", "Title", to: :title

  include_examples "sync airtable column", "Email Address", {
    to: :email,
    with: "test@test.com"
  }

  describe "when 'Company Name' is a lookup column type" do
    it "syncs the first item in the array" do
      record = create(:user, company_name: nil)
      airtable = Airtable::ClientContact.new({
        "Company Name" => ["Testing", "Another"]
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.company_name
      }.from(nil).to("Testing")
    end
  end

  describe "when 'Company Name' is not an array" do
    it "syncs the data as is" do
      record = create(:user, company_name: nil)
      airtable = Airtable::ClientContact.new({
        "Company Name" => "Testing"
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.company_name
      }.from(nil).to("Testing")
    end
  end

  describe "push_data" do
    let(:user) { create(:user) }
    let(:airtable) { Airtable::ClientContact.new({}, id: user.airtable_id) }

    before :each do
      allow(airtable).to receive(:save)
    end

    it "syncs the email" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Email Address']
      }.from(nil).to(user.email)
    end

    it "syncs the first_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields['First Name']
      }.from(nil).to(user.first_name)
    end

    it "syncs the last_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Last Name']
      }.from(nil).to(user.last_name)
    end

    it "syncs the country" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Country']
      }.from(nil).to([user.country.airtable_id])
    end

    it "syncs the company_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Company Name']
      }.from(nil).to(user.company_name)
    end
  end
end