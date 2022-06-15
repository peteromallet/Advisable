# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RescheduleInterview do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Call Scheduled") }
  let(:context) { {current_user:, current_account: current_user.account} }
  let(:new_time) { 1.day.from_now }
  let(:extra_args) { "" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      rescheduleInterview(input: {
        interview: "#{interview.uid}",
        startsAt: "#{new_time.iso8601}",
        #{extra_args}
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when participant" do
    let(:current_user) { interview.accounts.first.specialist_or_user }

    it "updates interview, sends system message and an email, updates gcal" do
      expect_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview).with(interview)
      response = AdvisableSchema.execute(query, context:)
      interview = Interview.find_by!(uid: response.dig("data", "rescheduleInterview", "interview", "id"))
      expect(interview.starts_at).to be_within(1.second).of(new_time)
      conversation = Conversation.by_accounts(interview.accounts)
      expect(conversation.messages.size).to eq(1)
      system_message = conversation.messages.find_by(kind: "InterviewRescheduled")
      expect(system_message.interview).to eq(interview)
      expect(system_message.metadata["starts_at"]).to eq(new_time.iso8601)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_rescheduled", "deliver_now", {args: [interview.accounts.last, interview, current_user.account, nil]}).once
      expect(MessageNotifierJob).not_to have_been_enqueued
    end

    context "with message" do
      let(:extra_args) { "message: \"This is a message.\"" }

      it "updates interview, sends system message and an email, updates gcal" do
        expect_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview).with(interview)
        response = AdvisableSchema.execute(query, context:)
        interview = Interview.find_by!(uid: response.dig("data", "rescheduleInterview", "interview", "id"))
        expect(interview.starts_at).to be_within(1.second).of(new_time)
        conversation = Conversation.by_accounts(interview.accounts)
        expect(conversation.messages.size).to eq(2)
        system_message = conversation.messages.find_by(kind: "InterviewRescheduled")
        expect(system_message.interview).to eq(interview)
        expect(system_message.metadata["starts_at"]).to eq(new_time.iso8601)
        user_message = conversation.messages.find_by(author: current_user.account)
        expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_rescheduled", "deliver_now", {args: [interview.accounts.last, interview, current_user.account, user_message]}).once
        expect(MessageNotifierJob).not_to have_been_enqueued
      end
    end

    context "when new time in the past" do
      let(:new_time) { 1.day.ago }

      it "returns an error" do
        response = AdvisableSchema.execute(query, context:)
        expect(response["errors"][0]["message"]).to eq("STARTS AT NOT IN FUTURE")
      end
    end

    context "when not reschedulable status" do
      it "returns an error" do
        interview.update(status: "Call Completed")
        response = AdvisableSchema.execute(query, context:)
        expect(response["errors"][0]["message"]).to eq("INTERVIEW NOT RESCHEDULABLE")
      end
    end

    context "when multiple participants" do
      it "sends email to all other accounts" do
        interview.accounts << create(:account)
        expect_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview).with(interview)
        AdvisableSchema.execute(query, context:)
        other_accounts = interview.accounts - [current_user.account]
        expect(other_accounts.count).to eq(2)
        other_accounts.each do |account|
          expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_rescheduled", "deliver_now", {args: [account, interview, current_user.account, nil]}).once
        end
      end
    end
  end

  context "when logged in user is not a participant" do
    let(:current_user) { create(:specialist) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when not logged in" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      expect(response["errors"][0]["extensions"]["type"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
