require 'rails_helper'

describe Mutations::UpdateCustomer do
  let(:user) { create(:user, stripe_customer_id: "cus_123") }
  let(:query) { %|
    mutation {
      updateCustomer(input: {
        user: #{user.uid},
        name: "Company Name",
        email: "test@test.com",
      }) {
        customer {
          id
          name
          email
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  let(:context) { { current_user: user} }
  
  it "updates the stirpe customer details" do
    customer = double(Stripe::Customer, { id: "cus_123", name: "Company Name", email: "test@test.com" })
    expect(Stripe::Customer).to receive(:update).with("cus_123", {
      name: "Company Name",
      email: "test@test.com"
    }).and_return(customer)
    
    AdvisableSchema.execute(query, context: context)
  end
end