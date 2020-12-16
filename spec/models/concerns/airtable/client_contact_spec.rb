require "rails_helper"

RSpec.describe Airtable::ClientContact do
  include_examples("sync airtable columns to association", {
    association: :account,
    columns: [
      {from: "Email Address", to: :email, with: "test@airtable.com"},
      {from: "First Name", to: :first_name, with: "John"},
      {from: "Last Name", to: :last_name, with: "Snow"},
      {from: "VAT Number", to: :vat_number, with: "BeyondTheWall123"}
    ]
  })

  describe "sync_data" do
    describe "syncs title column" do
      let(:user) { create(:user, title: "Old Title") }
      let(:airtable) { described_class.new({"Email Address" => "test@airtable.com", "Title" => "New Title"}, id: user.airtable_id) }

      it "sync the Title column to :title" do
        expect { airtable.sync }.to change { user.reload.title }.from("Old Title").to("New Title")
      end
    end

    describe "syncs company type" do
      let!(:company) { create(:company, kind: "Startup") }
      let!(:user) { create(:user, company: company) }
      let(:airtable) { described_class.new({"Email Address" => "test@airtable.com", "Type of Company" => "Hyper Mega Company"}, id: user.airtable_id) }

      it "sync the company type to User and Company" do
        airtable.sync
        expect(user.reload.company_type).to eq("Hyper Mega Company")
        expect(company.reload.kind).to eq("Hyper Mega Company")
      end
    end

    context "when the associated client has been synced" do
      it "associates the user to that client record" do
        user = create(:user, client: nil)
        client = create(:client)
        airtable = described_class.new({
          "Client" => [client.airtable_id],
          "Email Address" => "test@airtable.com"
        }, id: user.airtable_id)
        expect { airtable.sync }.to change {
          user.reload.client
        }.from(nil).to(client)
      end
    end
  end

  describe "value stripping" do
    let(:user) { create(:user) }
    let(:airtable) {
      described_class.new({
      "Email Address" => " test@airtable.com ",
      "First Name" => " Dwight ",
      "Last Name" => " Schrute ",
      "VAT Number" => " 1234 "
      }, id: user.airtable_id)
    }

    it "strips email, name, and VAT" do
      airtable.sync
      attributes = user.account.reload.attributes.slice("email", "first_name", "last_name", "vat_number").map(&:second)
      expect(attributes).to match_array(["1234", "Dwight", "Schrute", "test@airtable.com"])
    end
  end

  describe "push_data" do
    let(:user) { create(:user) }
    let(:airtable) { described_class.new({}, id: user.airtable_id) }

    before do
      allow(airtable).to receive(:save)
    end

    it "syncs the email" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Email Address']
      }.from(nil).to(user.account.email)
    end

    it "syncs the first_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields['First Name']
      }.from(nil).to(user.account.first_name)
    end

    it "syncs the last_name" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Last Name']
      }.from(nil).to(user.account.last_name)
    end

    it "syncs the country" do
      expect { airtable.push(user) }.to change {
        airtable.fields['Country']
      }.from(nil).to([user.country.airtable_id])
    end
  end

  describe "account handling" do
    let(:user) { create(:user) }
    let(:airtable) { described_class.new({"Email Address" => email}, id: user.airtable_id) }

    context "when email is present" do
      let(:email) { "test@airtable.com" }

      it "creates a user" do
        user = airtable.sync
        expect(user.account).not_to be_nil
      end
    end

    context "when email is blank" do
      let(:email) { "" }

      it "does not create a user" do
        user = airtable.sync
        expect(user).to be_nil
      end
    end
  end
end
