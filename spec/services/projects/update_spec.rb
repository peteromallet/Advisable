require "rails_helper"

describe Projects::Update do
  let(:project) { create(:project, description: "description") }
  let(:airtable_record) { double(Airtable::Project) }

  before :each do
    allow(airtable_record).to receive(:[]=)
    allow(airtable_record).to receive(:save)
    allow(Airtable::Project).to receive(:find).and_return(airtable_record)
  end

  it "updates the attributes of the project" do
    expect {
      Projects::Update.call(project: project, attributes: { description: 'updated' })
    }.to change { project.reload.description }.from("description").to("updated")
  end

  it "Syncs changes with airtable" do
    expect(airtable_record).to receive(:[]=).with("Project Description", "updated")
    Projects::Update.call(project: project, attributes: { description: 'updated' })
  end

  it "returns a project" do
    response = Projects::Update.call(project: project, attributes: { description: 'updated' })
    expect(response).to be_a(Project)
  end

  it "raises Service::Error if fails to save" do
    expect {
      Projects::Update.call(project: project, attributes: { name: nil })
    }.to raise_error(Service::Error, /blank/)
  end
end