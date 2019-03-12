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
end