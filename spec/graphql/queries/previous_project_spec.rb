require 'rails_helper'

RSpec.describe Types::PreviousProject do
  let(:previous_project) { create(:previous_project) }
  let(:query) do
    <<-GRAPHQL
      {
        previousProject(id: "#{previous_project.uid}") {
          id
          title
          goal
          excerpt
          description
          clientName
          companyType
          validationStatus
          onPlatform
          contactEmail
          contactFirstName
          contactLastName
          primarySkill {
            id
          }
          skills {
            id
          }
          primaryIndustry {
            id
          }
          industries {
            id
          }
          specialist {
            id
          }
          reviews {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:response) { AdvisableSchema.execute(query) }

  context 'when confidential is false' do
    it 'includes the company name in the title' do
      expect(response['data']['previousProject']['title']).to eq(
        "#{previous_project.primary_skill.name} project with #{
          previous_project.client_name
        }"
      )
    end

    it 'returns the company name' do
      expect(response['data']['previousProject']['clientName']).to eq(
        previous_project.client_name
      )
    end
  end

  context 'when confidential is false' do
    let(:previous_project) { create(:previous_project, confidential: true) }

    it 'hides the company name in the title' do
      expect(response['data']['previousProject']['title']).to eq(
        "#{previous_project.primary_skill.name} project with #{
          previous_project.primary_industry.name
        } #{previous_project.company_type}"
      )
    end

    it 'masks the company name' do
      expect(response['data']['previousProject']['clientName']).to eq(
        "#{previous_project.primary_industry.name} #{
          previous_project.company_type
        }"
      )
    end
  end

  it 'returns the goal' do
    expect(response['data']['previousProject']['goal']).to eq(
      previous_project.goal
    )
  end

  it 'returns the description' do
    expect(response['data']['previousProject']['description']).to eq(
      previous_project.description
    )
  end

  it 'returns the excerpt' do
    expect(response['data']['previousProject']['excerpt']).to eq(
      previous_project.description.try(:truncate, 160)
    )
  end

  it 'returns the company_type' do
    expect(response['data']['previousProject']['companyType']).to eq(
      previous_project.company_type
    )
  end

  it 'returns the validation_status' do
    expect(response['data']['previousProject']['validationStatus']).to eq(
      previous_project.validation_status
    )
  end

  context 'when the previous project has an application' do
    let(:application) { create(:application) }
    let(:previous_project) do
      create(:previous_project, application: application)
    end

    it 'retusn onPlatform as true' do
      expect(response['data']['previousProject']['onPlatform']).to be_truthy
    end
  end

  context 'when the previous project does not have an application' do
    let(:previous_project) { create(:previous_project, application: nil) }

    it 'retusn onPlatform as false' do
      expect(response['data']['previousProject']['onPlatform']).to be_falsey
    end
  end

  context 'when the validation_status is "In Progress"' do
    let(:previous_project) do
      create(
        :previous_project,
        validation_status: 'In Progress', contact_email: 'test@test.com'
      )
    end

    it 'returns the contact email' do
      expect(response['data']['previousProject']['contactEmail']).to eq(
        'test@test.com'
      )
    end
  end

  context 'when the validation_status is not "In Progress"' do
    let(:previous_project) do
      create(
        :previous_project,
        validation_status: 'Pending', contact_email: 'test@test.com'
      )
    end

    it 'returns the contact email' do
      expect(response['data']['previousProject']['contactEmail']).to be_nil
    end
  end

  it 'returns the contact first name' do
    expect(response['data']['previousProject']['contactFirstName']).to eq(
      previous_project.contact_first_name
    )
  end

  it 'returns the contact last name' do
    expect(response['data']['previousProject']['contactLastName']).to eq(
      previous_project.contact_last_name
    )
  end

  it 'returns the primary skill' do
    expect(response['data']['previousProject']['primarySkill']['id']).to eq(
      previous_project.primary_skill.airtable_id
    )
  end

  it 'returns the skills' do
    expect(response['data']['previousProject']['skills']).to include(
      { 'id' => previous_project.primary_skill.airtable_id }
    )
  end

  it 'returns the primary industry' do
    expect(response['data']['previousProject']['primaryIndustry']['id']).to eq(
      previous_project.primary_industry.uid
    )
  end

  it 'returns the industries' do
    expect(response['data']['previousProject']['industries']).to include(
      { 'id' => previous_project.primary_industry.uid }
    )
  end
end
