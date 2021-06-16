# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SendConsultationRequest do
  let(:user) { create(:user) }
  let(:current_user) { user }
  let(:context) { {current_user: current_user} }
  let(:consultation) { create(:consultation, user: user, status: 'Request Started', topic: nil) }
  let(:topic) { 'Testing' }
  let(:likely_to_hire) { 5 }

  let(:query) do
    <<-GRAPHQL
      mutation {
        sendConsultationRequest(input: {
          consultation: "#{consultation.uid}",
          likelyToHire: #{likely_to_hire}
        }) {
          consultation {
            id
          }
        }
      }
    GRAPHQL
  end

  it "sets the status to 'Request Completed'" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      consultation.reload.status
    }.from('Request Started').
      to('Request Completed')
  end

  it 'sets the likely_to_hire value' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      consultation.reload.likely_to_hire
    }.from(nil).
      to(5)
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end
end
