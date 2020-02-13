require 'rails_helper'

describe Mutations::AcceptConsultation do
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

  before :each do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it "Sets the consultation status to 'Accepted By Specialist'" do
    expect { AdvisableSchema.execute(query) }.to change {
      consultation.reload.status
    }.from('Request Started')
      .to('Accepted By Specialist')
  end

  it 'creates a project' do
    project = create(:project)
    expect(project).to receive(:sync_to_airtable)
    expect(Project).to receive(:create).with(
      user: consultation.user,
      skills: [consultation.skill],
      sales_status: 'Open',
      status: 'Project Created',
      service_type: 'Consultation',
      primary_skill: consultation.skill.name,
      owner: ENV['CONSULTATION_PROJECT_OWNER'],
      name: instance_of(String)
    )
      .and_return(project)

    AdvisableSchema.execute(query)
  end

  it 'creates an application record' do
    application = create(:application)
    expect(application).to receive(:sync_to_airtable)
    expect(Application).to receive(:create).with(
      project: instance_of(Project),
      status: 'Applied',
      score: 80,
      specialist: consultation.specialist
    )
      .and_return(application)

    AdvisableSchema.execute(query)
  end
end
