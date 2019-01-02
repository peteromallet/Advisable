require "rails_helper"

describe Users::Setup do
  let(:country) { create(:country, name: "Ireland") }
  let(:user) { create(:user, first_name: nil, last_name: nil, country: nil) }

  before :each do
    client_contact = double(Airtable::ClientContact)
    allow(client_contact).to receive(:push)
    allow(Airtable::ClientContact).to receive(:find).and_return(client_contact)
    allow(Airtable::ClientContact).to receive(:new).and_return(client_contact)

    client_record = double(Airtable::Client)
    allow(client_record).to receive(:push)
    allow(Airtable::Client).to receive(:find).and_return(client_record)
    allow(Airtable::Client).to receive(:new).and_return(client_record)
  end

  it "sets the users first name" do
    Users::Setup.call(
      first_name: "Jane",
      last_name: "Doe",
      country_name: country.name,
      company_name: 'Test Company',
      user: user
    )

    expect(user.first_name).to eq('Jane')
  end

  it "sets the users last name" do
    Users::Setup.call(
      first_name: "Jane",
      last_name: "Doe",
      country_name: country.name,
      company_name: 'Test Company',
      user: user
    )

    expect(user.last_name).to eq('Doe')
  end

  it "sets the users company name" do
    Users::Setup.call(
      first_name: "Jane",
      last_name: "Doe",
      country_name: country.name,
      company_name: "Test Company",
      user: user
    )

    expect(user.company_name).to eq('Test Company')
  end

  it "sets the users country" do
    Users::Setup.call(
      first_name: "Jane",
      last_name: "Doe",
      country_name: country.name,
      company_name: "Testing New",
      user: user
    )

    expect(user.reload.country).to eq(country)
  end

  describe "airtable syncing" do
    context "when the user does not have an airtable_id" do
      it "creates a new airtable record" do
        user.airtable_id = nil
        expect(Airtable::ClientContact).to receive(:new)
        Users::Setup.call(
          first_name: "Jane",
          last_name: "Doe",
          country_name: country.name,
          company_name: "Testing New",
          user: user
        )
      end
    end

    context "when the user has an airtable_id" do
      it "Updates the existing airtable record" do
        user.airtable_id = 'rec_1234'
        record = double(Airtable::ClientContact)
        expect(record).to receive(:push)
        expect(Airtable::ClientContact).to receive(:find).with('rec_1234').and_return(record)
        Users::Setup.call(
          first_name: "Jane",
          last_name: "Doe",
          country_name: country.name,
          company_name: "Testing New",
          user: user
        )
      end
    end
  end
end