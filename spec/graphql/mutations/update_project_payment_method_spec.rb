require 'rails_helper'

RSpec.describe Mutations::UpdateProjectPaymentMethod do
  let(:user) { create(:user, project_payment_method: nil) }
  let(:query) do
    <<-GRAPHQL
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
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow(Stripe::Customer).to receive(:update)
    allow(Stripe::Customer).to receive(:create_tax_id)
  end

  let(:context) { { current_user: user } }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  it 'updates the project pament method' do
    bio =
      response['data']['updateProjectPaymentMethod']['user'][
        'projectPaymentMethod'
      ]
    expect(bio).to eq('Bank Transfer')
  end

  it 'updates the invoice settings' do
    bio =
      response['data']['updateProjectPaymentMethod']['user']['invoiceSettings']
    expect(bio).to eq(
      {
        name: 'Test Person',
        companyName: 'Test inc',
        vatNumber: '1234',
        address: {
          line1: 'Bacon Street',
          city: 'Egg City',
          state: 'Clare',
          country: 'IE',
          postcode: 'N/A'
        }.stringify_keys
      }.stringify_keys
    )
  end

  context 'when not logged in' do
    let(:context) { { current_user: nil } }

    it 'returns an error' do
      error =
        response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when logged in as a specialist' do
    let(:context) { { current_user: create(:specialist) } }

    it 'returns an error' do
      error =
        response['errors'][0]['extensions']['code']
      expect(error).to eq('MUST_BE_USER')
    end
  end

  it "stores the VAT number in stripe" do
    expect(Stripe::Customer).to receive(:create_tax_id).with(
      user.stripe_customer_id,
      {
        type: "eu_vat",
        value: "1234",
      }, {
        idempotency_key: "#{user.uid}-1234"
      }
    )

    response
  end
end
