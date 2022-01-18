# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeclineAgreement do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: user, current_account: user.account} }
  let(:agreement) { create(:agreement, status: "pending", specialist:, user:) }
  let(:response) { AdvisableSchema.execute(query, context:) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      declineAgreement(input: {
        agreement: "#{agreement&.uid}",
        message: "I don't like this agreement"
      }) {
        agreement {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when a user is signed in" do
    it "declines an agreement and creates messages" do
      id = response["data"]["declineAgreement"]["agreement"]["id"]
      agr = Agreement.with_log_data.find_by!(uid: id)
      expect(agr.status).to eq("declined")
      expect(agr.log_data.responsible_id).to eq(user.account_id)

      conversation = Conversation.find_existing_with(user, specialist)
      expect(conversation.messages.count).to eq(2)
      expect(conversation.messages.first.kind).to eq("AgreementDeclined")
      expect(conversation.messages.last.content).to eq("I don't like this agreement")
    end
  end

  context "when the agreement does not exist" do
    let(:agreement) { nil }

    it "responds with not found error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_FOUND")
    end
  end

  context "when the specialist is signed in" do
    let(:context) { {current_user: specialist} }

    it "responds with must be specialist error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user signed in" do
    let(:context) { {current_user: nil} }

    it "responds with not authenticated error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
