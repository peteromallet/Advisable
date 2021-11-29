# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeclineConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:consultation) { create(:consultation, specialist: specialist, status: "Request Started") }
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
    }.from("Request Started").
      to("Specialist Rejected")
  end

  context "when a message exists" do
    let(:conversation) { create(:conversation) }
    let!(:participant) { conversation.participants.create(account: current_user.account) }

    it "creates a system message" do
      create(:message, consultation: consultation, conversation: conversation)
      message_count = Message.count
      AdvisableSchema.execute(query, context: context)
      expect(Message.count).to eq(message_count + 1)
      last_message = consultation.messages.last
      expect(last_message.kind).to eq("system")
      expect(last_message.content).to eq("consultations.declined")
      expect(participant.reload.unread_count).to eq(1)
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
