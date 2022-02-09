# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeclineConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:consultation) { create(:consultation, specialist:, status: "Request Completed") }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      declineConsultation(input: {
        consultation: "#{consultation.uid}",
        reason: "Not interested"
      }) {
        consultation {
          id
        }
      }
    }
    GRAPHQL
  end

  it "sets the consultation status to 'Specialist Rejected'" do
    expect { AdvisableSchema.execute(query, context:) }.to change {
      consultation.reload.status
    }.from("Request Completed").
      to("Specialist Rejected")
  end

  context "when a message exists" do
    let(:conversation) { create(:conversation) }

    before do
      conversation.participants.create(account: current_user.account)
      create(:message, consultation:, conversation:)
    end

    it "creates a system message" do
      expect(conversation.messages.where(kind: "ConsultationDeclined")).not_to exist
      AdvisableSchema.execute(query, context:)
      expect(conversation.messages.where(kind: "ConsultationDeclined")).to exist
    end

    it "creates a user message" do
      AdvisableSchema.execute(query, context:)
      last_message = conversation.messages.last
      expect(last_message.content).to eq("Not interested")
    end

    it "notifies the user via email" do
      AdvisableSchema.execute(query, context:)
      message = conversation.messages.last
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "consultation_declined", "deliver_now", {
        args: [consultation, message]
      }).once
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
