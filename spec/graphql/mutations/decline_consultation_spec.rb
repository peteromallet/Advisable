# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DeclineConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:consultation) { create(:consultation, specialist: specialist, status: 'Request Started') }
  let(:context) { {current_user: current_user} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      declineConsultation(input: {
        consultation: "#{consultation.uid}"
      }) {
        consultation {
          id
        }
      }
    }
    GRAPHQL
  end

  it "sets the consultation status to 'Specialist Rejected'" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      consultation.reload.status
    }.from('Request Started').
      to('Specialist Rejected')
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
