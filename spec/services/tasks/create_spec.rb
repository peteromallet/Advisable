require 'rails_helper'

RSpec.describe Tasks::Create do
  let(:application) { create(:application) }
  let(:attributes) {{  }}

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it 'creates a new task record' do
    expect {
      Tasks::Create.call(
        application: application,
        attributes: {}
      )
    }.to change {
      Task.all.count
    }.by(1)
  end

  it 'syncs to airtable' do
    expect_any_instance_of(Task).to receive(:sync_to_airtable)
    Tasks::Create.call(
      application: application,
      attributes: {}
    )
  end
end