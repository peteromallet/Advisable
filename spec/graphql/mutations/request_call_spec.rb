# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RequestCall do
  let(:specialist) { create(:specialist) }
  let(:user) { create(:user) }
  let(:current_user) { user }
  let(:accounts) { [specialist.account.uid] }
  let(:context) { {current_user:} }
  let(:extra_args) { "" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestCall(input: {
        accounts: #{accounts},
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

  context "when the current user is a user" do
    let(:current_user) { user }
    let(:accounts) { [specialist.account.uid] }

    it "creates a new interview, does not send message email, sends an email to specialist" do
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestCall"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, user.account])

      message = interview.messages.first
      expect(message.kind).to eq("InterviewRequest")
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [user.account.id, 0]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_request", "deliver_now", {args: [specialist.account, interview, user.account, message]}).once
      expect(SlackMessageJob).to have_been_enqueued.with(channel: "consultation_requests", text: "#{user.name_with_company} has requested a call with #{specialist.name}. (<https://app.advisable.com/toby/interviews/#{interview.id}|View in Toby>)").once
    end

    context "when an article is passed in" do
      let(:article) { create(:case_study_article) }
      let(:extra_args) { "article: \"#{article.uid}\"" }

      it "stores it on the interview record" do
        response = AdvisableSchema.execute(query, context:)
        uid = response["data"]["requestCall"]["interview"]["id"]
        interview = Interview.find_by!(uid:)
        expect(interview.article).to eq(article)
      end
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { specialist }
    let(:accounts) { [user.account.uid] }

    it "creates a new interview, does not send message email, sends an email to user" do
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestCall"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, user.account])

      message = interview.messages.first
      expect(message.kind).to eq("InterviewRequest")
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 0], [user.account.id, 1]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_request", "deliver_now", {args: [user.account, interview, specialist.account, message]}).once
      expect(SlackMessageJob).to have_been_enqueued.with(channel: "consultation_requests", text: "#{specialist.name} has requested a call with #{user.name_with_company}. (<https://app.advisable.com/toby/interviews/#{interview.id}|View in Toby>)").once
    end
  end

  context "when multiple accounts" do
    let(:current_user) { specialist }
    let(:another_specialist) { create(:specialist) }
    let(:another_user) { create(:user) }
    let(:accounts) { [user.account.uid, another_specialist.account.uid, another_user.account.uid] }

    it "creates a new interview, does not send message emails, sends emails to every participant" do
      c_count = Interview.count
      m_count = Message.count
      response = AdvisableSchema.execute(query, context:)
      expect(Interview.count).to eq(c_count + 1)
      expect(Message.count).to eq(m_count + 1)

      uid = response["data"]["requestCall"]["interview"]["id"]
      interview = Interview.find_by!(uid:)
      expect(interview.accounts).to match_array([specialist.account, user.account, another_specialist.account, another_user.account])

      message = interview.messages.first
      expect(message.content).to eq("Wanna chat?")
      expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 0], [user.account.id, 1], [another_specialist.account.id, 1], [another_user.account.id, 1]])

      expect(MessageNotifierJob).not_to have_been_enqueued
      other = [user.account, another_specialist.account, another_user.account]
      other.each do |acc|
        expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_request", "deliver_now", {args: [acc, interview, specialist.account, message]}).once
      end
      expect(SlackMessageJob).to have_been_enqueued.with(channel: "consultation_requests", text: "#{specialist.name} has requested a call with #{other.map(&:name_with_company).to_sentence}. (<https://app.advisable.com/toby/interviews/#{interview.id}|View in Toby>)").once
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
