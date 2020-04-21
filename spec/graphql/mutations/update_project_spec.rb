require 'rails_helper'

describe Mutations::UpdateProject do
  let(:project) { create(:project) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      updateProject(input: {
        id: "#{project.airtable_id}",
        goals: ["This is a goal"],
        primarySkill: "Sales",
        description: "This is the description",
        serviceType: "Self-Service",
        companyDescription: "company description",
        specialistDescription: "specialist description",
        questions: ["This is a question?"],
        requiredCharacteristics: ["Required"],
        optionalCharacteristics: ["Optional"],
        acceptedTerms: true
      }) {
        project {
          goals
          primarySkill
          description
          serviceType
          companyDescription
          specialistDescription
          questions
          requiredCharacteristics
          optionalCharacteristics
          acceptedTerms
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  let(:response) { AdvisableSchema.execute(query) }

  before :each do
    create(:skill, name: 'Sales')
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it 'sets the goals' do
    goals = response['data']['updateProject']['project']['goals']
    expect(goals).to eq(['This is a goal'])
  end

  it 'sets the primarySkill' do
    primarySkill = response['data']['updateProject']['project']['primarySkill']
    expect(primarySkill).to eq('Sales')
  end

  it 'sets the description' do
    description = response['data']['updateProject']['project']['description']
    expect(description).to eq('This is the description')
  end

  it 'sets the serviceType' do
    serviceType = response['data']['updateProject']['project']['serviceType']
    expect(serviceType).to eq('Self-Service')
  end

  it 'sets the companyDescription' do
    companyDescription =
      response['data']['updateProject']['project']['companyDescription']
    expect(companyDescription).to eq('company description')
  end

  it 'sets the specialistDescription' do
    specialistDescription =
      response['data']['updateProject']['project']['specialistDescription']
    expect(specialistDescription).to eq('specialist description')
  end

  it 'sets the questions' do
    questions = response['data']['updateProject']['project']['questions']
    expect(questions).to eq(['This is a question?'])
  end

  it 'sets the requiredCharacteristics' do
    requiredCharacteristics =
      response['data']['updateProject']['project']['requiredCharacteristics']
    expect(requiredCharacteristics).to eq(%w[Required])
  end

  it 'sets the optionalCharacteristics' do
    optionalCharacteristics =
      response['data']['updateProject']['project']['optionalCharacteristics']
    expect(optionalCharacteristics).to eq(%w[Optional])
  end

  it 'accepts the terms' do
    acceptedTerms =
      response['data']['updateProject']['project']['acceptedTerms']
    expect(acceptedTerms).to be_truthy
  end
end
