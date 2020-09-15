require 'rails_helper'

RSpec.describe Projects::Update do
  let(:project) { create(:project, description: 'description') }

  before :each do
    allow(project).to receive(:sync_to_airtable)
  end

  it 'updates the attributes of the project' do
    expect {
      Projects::Update.call(
        project: project, attributes: { description: 'updated' }
      )
    }.to change { project.reload.description }.from('description').to('updated')
  end

  it 'Syncs changes with airtable' do
    expect(project).to receive(:sync_to_airtable)
    Projects::Update.call(
      project: project, attributes: { description: 'updated' }
    )
  end

  it 'returns a project' do
    response =
      Projects::Update.call(
        project: project, attributes: { description: 'updated' }
      )
    expect(response).to be_a(Project)
  end
end
