# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::AcceptConsultation do
  let!(:consultation) { create(:consultation, status: 'Request Started') }

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
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it "Sets the consultation status to 'Accepted By Specialist'" do
    expect { AdvisableSchema.execute(query) }.to change {
      consultation.reload.status
    }.from('Request Started').to('Accepted By Specialist')
  end

  it "creates a project" do
    response = AdvisableSchema.execute(query)
    interview_id = response["data"]["acceptConsultation"]["interview"]["id"]
    project = Interview.find_by(uid: interview_id).application.project
    expect(project.attributes.slice("user_id", "sales_status", "status", "service_type", "owner", "name").values).to match_array([consultation.user_id, "Open", "Project Created", "Consultation", ENV["CONSULTATION_PROJECT_OWNER"], "#{consultation.user.company_name} - #{consultation.skill.name}"])
    expect(project.primary_skill).to eq(consultation.skill)
  end

  it "creates an application" do
    response = AdvisableSchema.execute(query)
    interview_id = response["data"]["acceptConsultation"]["interview"]["id"]
    application = Interview.find_by(uid: interview_id).application
    expect(application.attributes.slice("status", "score", "specialist_id", "trial_program").values).to match_array(["Applied", 90, consultation.specialist.id, true])
  end

  context 'when the user already has a project with the skill' do
    let!(:project) do
      create(:project, user: consultation.user, primary_skill: consultation.skill)
    end

    it 'doesnt create a new project' do
      expect { AdvisableSchema.execute(query) }.not_to change(Project, :count)
    end

    it 'creates an application for that project' do
      expect { AdvisableSchema.execute(query) }.to change {
        project.applications.count
      }.by(1)
    end
  end
end
