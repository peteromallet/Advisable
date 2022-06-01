# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RequestInterview do
  let(:specialist) { create(:specialist) }
  let(:current_user) { create(:user) }
  let(:context) { {current_user:} }
  let(:extra_args) { "" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestInterview(input: {
        message: "Wanna chat?",
        #{extra_args}
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when legacy specialist argument" do
    let(:extra_args) { "specialist: \"#{specialist.uid}\"" }

    it "creates a new interview, does not send message email, sends an email to specialist" do
      expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestInterview"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, current_user.account])

      message = interview.messages.first
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [current_user.account.id, 0]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_request", "deliver_now", {args: [an_instance_of(Interview)]}).once
      expect(SlackMessageJob).to have_been_enqueued.with(channel: "consultation_requests", text: "We have a new interview request for #{specialist.account.name} from #{current_user.name_with_company}: Wanna chat?.").once
    end
  end

  context "when new accounts argument" do
    let(:extra_args) { "accounts: [\"#{specialist.account.uid}\"]" }

    it "creates a new interview, does not send message email, sends an email to specialist" do
      expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestInterview"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, current_user.account])

      message = interview.messages.first
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [current_user.account.id, 0]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_request", "deliver_now", {args: [an_instance_of(Interview)]}).once
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }
    let(:extra_args) { "accounts: [\"#{specialist.account.uid}\"]" }

    it "creates a new interview, does not send message email, does not send an email to any specialist" do
      expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestInterview"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, current_user.account])

      message = interview.messages.first
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [current_user.account.id, 0]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued
    end
  end

  context "when multiple accounts" do
    let(:current_user) { create(:specialist) }
    let(:another_specialist) { create(:specialist) }
    let(:user) { create(:user) }
    let(:another_user) { create(:user) }
    let(:extra_args) { "accounts: [\"#{specialist.account.uid}\", \"#{another_specialist.account.uid}\", \"#{user.account.uid}\"]" }

    it "creates a new interview, does not send message email, does not send an email to any specialist" do
      expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestInterview"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, current_user.account, another_specialist.account, user.account])

      message = interview.messages.first
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [current_user.account.id, 0], [another_specialist.account.id, 1], [user.account.id, 1]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued
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

  context "when an article is passed in" do
    let(:article) { create(:case_study_article) }
    let(:extra_args) { "article: \"#{article.uid}\"" }

    it "stores it on the interview record" do
      response = AdvisableSchema.execute(query, context:)
      id = response.dig("data", "requestInterview", "interview", "id")
      interview = Interview.find_by!(uid: id)
      expect(interview.article).to eq(article)
    end
  end
end
