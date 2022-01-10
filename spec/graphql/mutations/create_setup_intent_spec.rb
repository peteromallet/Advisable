# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateSetupIntent do
  let(:company) { create(:company, setup_intent_status: nil, stripe_setup_intent_id: nil) }
  let(:context) { {current_user: user} }
  let(:user) { create(:user, company:) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      createSetupIntent(input: {}) {
        secret
      }
    }
    GRAPHQL
  end

  # rubocop:disable RSpec/VerifiedDoubles
  before do
    intent = double(Stripe::SetupIntent, id: "1234", client_secret: "1234")
    allow(Stripe::SetupIntent).to receive(:create).and_return(intent)
  end
  # rubocop:enable RSpec/VerifiedDoubles

  it "returns the setup intent secret" do
    response = AdvisableSchema.execute(query, context:)
    secret = response["data"]["createSetupIntent"]["secret"]
    expect(secret).to eq("1234")
  end

  it "sets the setup_intent_status to 'pending'" do
    expect { AdvisableSchema.execute(query, context:) }.to change {
      company.reload.setup_intent_status
    }.from(nil).
      to("pending")
  end

  it "stores the stripe_setup_intent_id" do
    expect { AdvisableSchema.execute(query, context:) }.to change {
      company.reload.stripe_setup_intent_id
    }.from(nil).
      to("1234")
  end

  context "when not logged in" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      expect(response["errors"][0]["extensions"]["type"]).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when logged in as a specialist" do
    let(:context) { {current_user: create(:specialist)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      expect(response["errors"][0]["extensions"]["type"]).to eq("INVALID_REQUEST")
    end
  end
end
