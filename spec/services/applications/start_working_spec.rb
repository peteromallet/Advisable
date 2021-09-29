# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Applications::StartWorking do
  let(:application) { create(:application, status: 'Applied', project_type: nil) }
  let(:project_type) { 'Fixed' }
  let(:monthly_limit) { 150 }

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the application status to 'Working'" do
    expect do
      described_class.call(
        application: application,
        project_type: project_type,
        monthly_limit: monthly_limit
      )
    end.to change { application.reload.status }.from('Applied').to('Working')
  end

  it 'sets the project type' do
    expect do
      described_class.call(
        application: application,
        project_type: project_type,
        monthly_limit: monthly_limit
      )
    end.to change(application, :project_type).from(nil).to(project_type)
  end

  it 'syncs with airtable' do
    expect(application).to receive(:sync_to_airtable)
    described_class.call(
      application: application,
      project_type: project_type,
      monthly_limit: monthly_limit
    )
  end

  it 'creates a previous project' do
    previous_project = double(PreviousProject) # rubocop:disable RSpec/VerifiedDoubles
    allow_any_instance_of(Application).to receive(:create_previous_project).and_return(previous_project)
    described_class.call(
      application: application,
      project_type: project_type,
      monthly_limit: monthly_limit
    )
  end

  context 'when the application doesnt save' do
    it 'raises an error' do
      allow(application).to receive(:save).and_return(false)
      expect do
        described_class.call(
          application: application,
          project_type: project_type,
          monthly_limit: monthly_limit
        )
      end.to raise_error(Service::Error)
    end
  end

  context 'when an invalid project type is passed' do
    it 'raises an error' do
      expect do
        described_class.call(
          application: application,
          project_type: 'invalid project type',
          monthly_limit: monthly_limit
        )
      end.to raise_error(Service::Error, 'INVALID_PROJECT_TYPE')
    end
  end
end
