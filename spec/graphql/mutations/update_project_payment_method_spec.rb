require 'rails_helper'

describe Mutations::UpdateProjectPaymentMethod do
  let(:user) { create(:user, project_payment_method: nil) }
  let(:query) { %|
    mutation {
      updateProjectPaymentMethod(input: {
        paymentMethod: "Bank Transfer",
        acceptTerms: true,
        invoiceSettings: {
          name: "Test Person",
          companyName: "Test inc",
          vatNumber: "1234",
          address: {
            line1: "Bacon Street",
            city: "Egg City",
            state: "Clare",
            country: "IE",
            postcode: "N/A"
          }
        }
      }) {
        user {
          id
          projectPaymentMethod
          invoiceSettings {
            name
            companyName
            vatNumber
            address {
              line1
              city
              state
              country
              postcode
            }
          }
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow(Stripe::Customer).to receive(:update)
  end

  let(:context) { { current_user: user} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  it "updates the project pament method" do
    bio = response["data"]["updateProjectPaymentMethod"]["user"]["projectPaymentMethod"]
    expect(bio).to eq("Bank Transfer")
  end

  it "updates the invoice settings" do
    bio = response["data"]["updateProjectPaymentMethod"]["user"]["invoiceSettings"]
    expect(bio).to eq({
      name: "Test Person",
      companyName: "Test inc",
      vatNumber: "1234",
      address: {
        line1: "Bacon Street",
        city: "Egg City",
        state: "Clare",
        country: "IE",
        postcode: "N/A"
      }.stringify_keys
    }.stringify_keys)
  end

  context 'when not logged in' do
    let(:context) {{ current_user: nil }}

    it 'returns an error' do
      error = response["data"]["updateProjectPaymentMethod"]["errors"][0]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context 'when logged in as a specialist' do
    let(:context) {{ current_user: create(:specialist) }}

    it 'returns an error' do
      error = response["data"]["updateProjectPaymentMethod"]["errors"][0]["code"]
      expect(error).to eq("notAuthorized")
    end
  end
end