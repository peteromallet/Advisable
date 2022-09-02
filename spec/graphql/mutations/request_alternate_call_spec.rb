# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RequestAlternateCall do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Call Requested", requested_by: user.account) }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestAlternateCall(input: {
        interview: "#{interview.uid}",
        reason: "Not interested"
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  it "sets the interview status to 'Declined' and creates a new one" do
    expect(interview.status).to eq("Call Requested")
    response = AdvisableSchema.execute(query, context:)
    alternate = Interview.find_by(uid: response.dig("data", "requestAlternateCall", "interview", "id"))

    expect(interview.reload.status).to eq("Declined")
    expect(alternate.accounts).to match_array(interview.accounts)
    expect(alternate.status).to eq("Call Requested")
    expect(alternate.requested_by).to eq(specialist.account)
    expect(alternate.conversation.messages.last.kind).to eq("InterviewRequest")
    expect(alternate.conversation.messages.last.interview).to eq(alternate)
    expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "interview_declined", "deliver_now", anything)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "alternate_interview_request", "deliver_now", args: [user.account, alternate, specialist.account, "Not interested"])
    expect(SlackMessageJob).to have_been_enqueued.with(channel: "client_activity", text: "#{specialist.account.name} has requested an alternate call with #{user.account.name_with_company}. (<https://advisable.com/toby/interviews/#{alternate.id}|View in Toby>)").once
  end

  context "when a message exists" do
    let(:conversation) { Conversation.by_accounts(interview.accounts) }

    before { create(:message, interview:, conversation:) }

    it "creates system messages" do
      expect(conversation.messages.where(kind: "InterviewDeclined")).not_to exist
      expect(conversation.messages.where(kind: "InterviewRequest")).not_to exist
      AdvisableSchema.execute(query, context:)
      expect(conversation.messages.where(kind: "InterviewDeclined")).to exist
      expect(conversation.messages.where(kind: "InterviewRequest")).to exist
    end

    it "creates a user message" do
      AdvisableSchema.execute(query, context:)
      last_users_message = conversation.messages.where(author: specialist.account).first
      expect(last_users_message.content).to eq("Not interested")
    end
  end

  context "when the current user is the user" do
    let(:current_user) { user }

    it "sets the interview status to 'Declined'" do
      expect(interview.status).to eq("Call Requested")
      AdvisableSchema.execute(query, context:)
      expect(interview.reload.status).to eq("Declined")
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

  context "when the current user is another user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the current user is another specialist" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the interview has already been declined" do
    let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Declined") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("CANNOT_DECLINE")
    end
  end
end
