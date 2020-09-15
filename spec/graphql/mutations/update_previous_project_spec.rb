require 'rails_helper'

RSpec.describe Mutations::UpdatePreviousProject do
  let(:draft) { true }
  let(:validation_status) { 'Pending' }
  let(:project) do
    create(
      :previous_project,
      client_name: 'Test',
      confidential: false,
      primary_skill: nil,
      primary_industry: nil,
      company_type: 'Corporation',
      description: 'Description',
      goal: nil,
      draft: draft,
      public_use: true,
      validation_status: validation_status
    )
  end
  let(:client_name) { 'CHANGED' }
  let!(:marketing) { create(:skill, name: 'Marketing') }
  let!(:design) { create(:skill, name: 'Design') }
  let(:skills) { [marketing.name, design.name] }
  let(:confidential) { true }
  let(:primary_skill) { marketing.name }
  let(:company_type) { 'Startup' }
  let(:industry1) { create(:industry, name: 'Industry 1') }
  let(:industry2) { create(:industry, name: 'Industry 2') }
  let(:industries) { [industry1.name, industry2.name] }
  let(:primary_industry) { industry1.name }
  let(:description) { 'Testing' }
  let(:goal) { 'Goal' }
  let(:public_use) { false }

  let(:query) do
    <<~GRAPHQL
    mutation {
      updatePreviousProject(input: {
        previousProject: "#{project.uid}",
        skills: #{skills},
        clientName: "#{client_name}",
        companyType: "#{company_type}",
        primarySkill: "#{primary_skill}",
        description: "#{description}",
        industries: #{industries},
        confidential: #{confidential},
        primaryIndustry: "#{primary_industry}"
        goal: "#{goal}",
        publicUse: #{public_use},
      }) {
        previousProject {
          id
        }
      }
    }  
  GRAPHQL
  end

  it 'sets the skills for the project' do
    other = create(:skill)
    project.skills << other
    response = AdvisableSchema.execute(query)
    expect(project.reload.skills).to include(marketing)
    expect(project.reload.skills).to include(design)
    expect(project.reload.skills).to_not include(other)
  end

  context 'when project is not a draft' do
    let(:draft) { false }

    it 'returns an error when trying to update skills when project is not a draft' do
      query = <<~GRAPHQL
        mutation {
          updatePreviousProject(input: {
            previousProject: "#{project.uid}",
            skills: ["Marketing", "Design"]
          }) {
            previousProject {
              id
            }
          }
        }
      GRAPHQL

      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('projectPublished')
    end
  end

  it 'sets the primary skill' do
    other = create(:skill)
    project.project_skills.create(skill: other, primary: true)
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.primary_skill
    }.from(other).to(marketing)
  end

  it 'sets the industries for the project' do
    other = create(:industry)
    project.industries << other
    response = AdvisableSchema.execute(query)
    expect(project.reload.industries).to include(industry1)
    expect(project.reload.industries).to include(industry2)
    expect(project.reload.industries).to_not include(other)
  end

  it 'sets the primary industry' do
    other = create(:industry)
    project.project_industries.create(industry: other, primary: true)
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.primary_industry
    }.from(other).to(industry1)
  end

  it 'sets the client name' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.client_name
    }.from('Test').to(client_name)
  end

  it 'sets the confidential attribute' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.confidential
    }.from(false).to(true)
  end

  it 'sets the company_type' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.company_type
    }.from('Corporation').to('Startup')
  end

  describe 'Updating the description' do
    context 'when the project is a draft' do
      let(:draft) { true }

      it 'sets the description' do
        expect { AdvisableSchema.execute(query) }.to change {
          project.reload.description
        }.from('Description').to('Testing')
      end
    end

    context 'when the project is not a draft' do
      let(:draft) { false }

      context 'and the validation status is Pending' do
        let(:validation_status) { 'Pending' }

        it 'sets the description' do
          query = <<~GRAPHQL
            mutation {
              updatePreviousProject(input: {
                previousProject: "#{project.uid}",
                description: "Testing"
              }) {
                previousProject {
                  id
                }
              }
            }
          GRAPHQL

          expect { AdvisableSchema.execute(query) }.to change {
            project.reload.description
          }.from('Description').to('Testing')
        end
      end

      context 'and the validation status is In Progres' do
        let(:validation_status) { 'In Progress' }

        it 'sets pending_description column' do
          query = <<~GRAPHQL
            mutation {
              updatePreviousProject(input: {
                previousProject: "#{project.uid}",
                description: "Testing"
              }) {
                previousProject {
                  id
                }
              }
            }
          GRAPHQL

          expect { AdvisableSchema.execute(query) }.to change {
            project.reload.pending_description
          }.from(nil).to('Testing')
        end
      end

      context 'and the validation status is Validated' do
        let(:validation_status) { 'Validated' }

        it 'sets pending_description column' do
          query = <<~GRAPHQL
            mutation {
              updatePreviousProject(input: {
                previousProject: "#{project.uid}",
                description: "Testing"
              }) {
                previousProject {
                  id
                }
              }
            }
          GRAPHQL

          expect { AdvisableSchema.execute(query) }.to change {
            project.reload.pending_description
          }.from(nil).to('Testing')
        end
      end

      context 'and the validation status is Validation Failed' do
        let(:validation_status) { 'Validation Failed' }

        it 'sets pending_description column' do
          query = <<~GRAPHQL
            mutation {
              updatePreviousProject(input: {
                previousProject: "#{project.uid}",
                description: "Testing"
              }) {
                previousProject {
                  id
                }
              }
            }
          GRAPHQL

          expect { AdvisableSchema.execute(query) }.to change {
            project.reload.pending_description
          }.from(nil).to('Testing')
        end
      end
    end
  end

  it 'sets the goal' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.goal
    }.from(nil).to('Goal')
  end

  it 'sets public_use' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.public_use
    }.from(true).to(false)
  end
end
