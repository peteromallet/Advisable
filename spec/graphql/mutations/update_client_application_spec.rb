require 'rails_helper'

RSpec.describe Mutations::UpdateClientApplication do
  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'Can update the company_name' do
    user = create(:user, application_status: :started, company_name: 'Before')
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          companyName: "After"
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.company_name
    }.from('Before').to('After')
  end

  it 'Doesnt update company name if not provided' do
    user = create(:user, application_status: :started, company_name: 'Before')
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.not_to change {
      user.reload.company_name
    }
  end

  it 'can update industry' do
    design = create(:industry, name: 'Design')
    development = create(:industry, name: 'Development')
    user = create(:user, application_status: :started, industry: design)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          industry: "#{development.name}"
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.industry
    }.from(design).to(development)
  end

  it 'Can update the number_of_freelancers' do
    user =
      create(:user, application_status: :started, number_of_freelancers: nil)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          numberOfFreelancers: "4-10" 
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.number_of_freelancers
    }.from(nil).to('4-10')
  end

  it 'Returns an error if the record doesnt save' do
    user = create(:user, application_status: :started)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          numberOfFreelancers: "invalid-value" 
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    response = AdvisableSchema.execute(query)
    code = response['errors'][0]['extensions']['code']
    expect(code).to eq('failedToSave')
  end

  it 'Can update the budget' do
    user = create(:user, application_status: :started, budget: nil)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          budget: 10000
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.budget
    }.from(nil).to(10_000)
  end

  it 'Can update the skills' do
    user = create(:user, application_status: :started)
    skill = create(:skill)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          skills: ["#{skill.name}"]
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.skills.count
    }.by(1)
  end

  context 'if the application_status is accepted' do
    it "Can't update any data" do
      user = create(:user, application_status: :accepted)
      query = <<-GRAPHQL
        mutation {
          updateClientApplication(input: {
            id: "#{user.uid}",
            companyName: "After"
          }) {
            clientApplication {
              id
            }
          }
        }
      GRAPHQL

      expect { AdvisableSchema.execute(query) }.not_to change {
        user.reload.company_name
      }
    end
  end
end
