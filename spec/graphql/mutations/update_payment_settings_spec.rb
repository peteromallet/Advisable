require 'rails_helper'

describe Mutations::UpdatePaymentSettings do
  let(:specialist) { create(:specialist) }
  let(:query) { %|
    mutation {
      updatePaymentSettings(input: {
        bankHolderName: "Test Person",
        bankCurrency: "EUR",
        vatNumber: "1234",
        bankHolderAddress: {
          line1: "Bacon Street",
          city: "Egg City",
          state: "Clare",
          country: "IE",
          postcode: "N/A"
        }
      }) {
        specialist {
          id
          bankHolderName
          bankCurrency
          vatNumber
          bankHolderAddress {
            line1
            city
            state
            country
            postcode
          }
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  let(:context) {{ current_user: specialist }}

  it "updates the specialists payment settings" do
    response = AdvisableSchema.execute(query, context: context)
    expect(response["data"]["updatePaymentSettings"]["specialist"]).to eq({
      id: specialist.uid,
      bankHolderName: "Test Person",
      bankCurrency: "EUR",
      vatNumber: "1234",
      bankHolderAddress: {
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
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["updatePaymentSettings"]["errors"][0]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context 'when logged in as a User' do
    let(:context) {{ current_user: create(:user) }}

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["updatePaymentSettings"]["errors"][0]["code"]
      expect(error).to eq("notAuthorized")
    end
  end
end