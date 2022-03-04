# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RequestInterview do
  let(:specialist) { create(:specialist) }
  let(:current_user) { create(:user) }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestInterview(input: {
        specialist: "#{specialist.uid}",
        message: "Wanna work for me, bro?",
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  it "creates a new interview, does not send message email, sends an email to specialist" do
    expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
    c_count = Interview.count
    m_count = Message.count
    response = AdvisableSchema.execute(query, context:)
    expect(Interview.count).to eq(c_count + 1)
    expect(Message.count).to eq(m_count + 1)

    uid = response["data"]["requestInterview"]["interview"]["id"]
    interview = Interview.find_by!(uid:)
    expect(interview.specialist).to eq(specialist)

    message = interview.messages.first
    expect(message.content).to eq("Wanna work for me, bro?")
    expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [current_user.account.id, 0]])

    expect(MessageNotifierJob).not_to have_been_enqueued
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_request", "deliver_now", {args: [an_instance_of(Interview)]}).once
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
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
end
