# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::AcceptConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:consultation) { create(:consultation, specialist:, status: "Request Started") }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        acceptConsultation(input: {
          consultation: "#{consultation.uid}"
        }) {
          interview {
            id
          }
        }
      }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it "Sets the consultation status to 'Accepted By Specialist'" do
    expect { AdvisableSchema.execute(query, context:) }.to change {
      consultation.reload.status
    }.from("Request Started").to("Accepted By Specialist")
  end

  it "creates a project" do
    response = AdvisableSchema.execute(query, context:)
    interview_id = response["data"]["acceptConsultation"]["interview"]["id"]
    project = Interview.find_by(uid: interview_id).application.project
    expect(project.attributes.slice("user_id", "sales_status", "status", "service_type", "name").values).to match_array([consultation.user_id, "Open", "Project Created", "Consultation", "#{consultation.user.company.name} - #{consultation.skill.name}"])
    expect(project.primary_skill).to eq(consultation.skill)
  end

  it "creates an application" do
    response = AdvisableSchema.execute(query, context:)
    interview_id = response["data"]["acceptConsultation"]["interview"]["id"]
    application = Interview.find_by(uid: interview_id).application
    expect(application.attributes.slice("status", "score", "specialist_id", "trial_program").values).to match_array(["Applied", 90, consultation.specialist.id, true])
  end

  context "when the user already has a project with the skill" do
    let!(:project) { create(:project, user: consultation.user, primary_skill: consultation.skill) }

    it "doesnt create a new project" do
      expect { AdvisableSchema.execute(query, context:) }.not_to change(Project, :count)
    end

    it "creates an application for that project" do
      expect { AdvisableSchema.execute(query, context:) }.to change {
        project.applications.count
      }.by(1)
    end
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
      expect(last_message.content).to eq("consultations.accepted")
      expect(participant.reload.unread_count).to eq(1)
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
