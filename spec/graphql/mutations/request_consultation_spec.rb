# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RequestConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { create(:user) }
  let(:context) { {current_user: current_user} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestConsultation(input: {
        specialist: "#{specialist.uid}",
        message: "Wanna work for me, bro?",
      }) {
        consultation {
          id
          message {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  it "creates a new consultation and message but doesn't send email" do
    expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
    c_count = Consultation.count
    m_count = Message.count
    response = AdvisableSchema.execute(query, context: context)
    expect(Consultation.count).to eq(c_count + 1)
    expect(Message.count).to eq(m_count + 1)

    uid = response["data"]["requestConsultation"]["consultation"]["id"]
    consultation = Consultation.find_by!(uid: uid)
    expect(consultation.specialist).to eq(specialist)

    message_uid = response["data"]["requestConsultation"]["consultation"]["message"]["id"]
    message = Message.find_by!(uid: message_uid)
    expect(message.content).to eq("Wanna work for me, bro?")
    expect(message.conversation.participants.pluck(:account_id, :unread_count)).to match_array([[specialist.account.id, 1], [current_user.account.id, 0]])
  end

  context "when there's a case study article" do
    let(:article) { create(:case_study_article, specialist: specialist) }

    it "uses primary skill of an article if there is one" do
      ::CaseStudy::Skill.create!(article: article, primary: false, skill: create(:skill, name: "Third"))
      ::CaseStudy::Skill.create!(article: article, primary: true, skill: create(:skill, name: "Primary"))

      response = AdvisableSchema.execute(query, context: context)
      uid = response["data"]["requestConsultation"]["consultation"]["id"]
      consultation = Consultation.find_by!(uid: uid)
      expect(consultation.skill.name).to eq("Primary")
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

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)

      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
