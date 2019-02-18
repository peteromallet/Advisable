require 'rails_helper'

describe Applications::Update do
  let(:specialist) { create(:specialist) }
  let(:off_platform_project) {
    create(:off_platform_project, airtable_id: "rec_987654321", specialist: specialist)
  }

  let(:original_attributes) {{
    specialist: specialist,
    introduction: "...",
    availability: "1 Month",
    questions: [{ question: "Is this a test?" }],
    rate: "",
    accepts_fee: nil,
    accepts_terms: nil
  }}

  let(:application) { create(:application, original_attributes) }

  let(:attributes) {{
    introduction: "testing",
    availability: "3 Months",
    questions: [{
      question: "Is this a test?",
      answer: "Yes it's a test"
    }],
    references: [off_platform_project.airtable_id],
    rate: 90,
    accepts_fee: true,
    accepts_terms: true
  }}

  before :each do
    airtable_record = double(Airtable::Application)
    allow(airtable_record).to receive(:push)
    allow(Airtable::Application).to receive(:find).and_return(airtable_record)
  end

  it "updates the introduction" do
    Applications::Update.call(id: application.airtable_id, attributes: attributes)
    expect(application.reload.introduction).to eq(attributes[:introduction])
  end

  it "raises an error if the application doesn't exist" do
    expect {
      Applications::Update.call(id: "nope", attributes: attributes)
    }.to raise_error(Service::Error, "record_not_found")
  end

  it "updates the availability" do
    Applications::Update.call(id: application.airtable_id, attributes: attributes)
    expect(application.reload.availability).to eq(attributes[:availability])
  end

  describe 'when setting questions' do
    it 'assigns the answer based on the question' do
      Applications::Update.call(id: application.airtable_id, attributes: attributes)
      expect(application.reload.questions[0]["answer"]).to eq("Yes it's a test")
    end

    context 'and passing a question that does not exist' do
      it 'raises an error' do
        expect {
          Applications::Update.call(id: application.airtable_id, attributes: attributes.merge({
            questions: [{
              question: "Does this exist?",
              answer: "Nope"
            }]
          }))
        }.to raise_error(Service::Error, "invalid_question")
      end
    end
  end

  describe 'assigning references' do
    it 'creates a new application_reference' do
      expect {
        Applications::Update.call(id: application.airtable_id, attributes: attributes)
      }.to change { application.references.count }.by(1)
    end

    it 'overrides any existing references' do
      previous_project = create(:project)
      application.references.create(project: previous_project)
      Applications::Update.call(id: application.airtable_id, attributes: attributes)
      application.reload
      projects = application.references.map(&:project)
      expect(projects).to_not include(previous_project)
    end

    context 'when an invalid ID is passed' do
      it 'raises and error' do
        expect {
          Applications::Update.call(id: application.airtable_id, attributes: attributes.merge({
            references: ["oasindfoaoinsdfo"]
          }))
        }.to raise_error(Service::Error, 'invalid_reference')
      end
    end
  end

  it 'updates the rate' do
    Applications::Update.call(id: application.airtable_id, attributes: attributes)
    expect(application.reload.rate).to eq(attributes[:rate])
  end

  it 'updates accepts_fee' do
    Applications::Update.call(id: application.airtable_id, attributes: attributes)
    expect(application.reload.accepts_fee).to eq(attributes[:accepts_fee])
  end

  it 'updates accepts_terms' do
    Applications::Update.call(id: application.airtable_id, attributes: attributes)
    expect(application.reload.accepts_terms).to eq(attributes[:accepts_terms])
  end
end