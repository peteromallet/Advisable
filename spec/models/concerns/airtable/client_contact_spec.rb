require "rails_helper"

RSpec.describe Airtable::ClientContact do
  include_examples "sync airtable column", "Title", to: :title

  include_examples("sync airtable columns to association", {
    association: :account,
    columns: [
      {from: "Email Address", to: :email, with: "test@test.com"},
      {from: "First Name", to: :first_name, with: "John"},
      {from: "Last Name", to: :last_name, with: "Snow"},
      {from: "VAT Number", to: :vat_number, with: "BeyondTheWall123"}
    ]
  })

  describe "sync_data" do
    context "when the associated client has been synced" do
      it "associates the user to that client record" do
        user = create(:user, client: nil)
        client = create(:client)
        airtable = Airtable::ClientContact.new({
          "Client" => [client.airtable_id]
        }, id: user.airtable_id)
        expect { airtable.sync }.to change {
          user.reload.client
        }.from(nil).to(client)
      end
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
      }.from(nil).to(user.account.email)
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
  end
end
