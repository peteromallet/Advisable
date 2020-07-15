require 'rails_helper'

describe Mutations::Signup do
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

  it 'Can update the locality_importance' do
    user = create(:user, application_status: :started, locality_importance: nil)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          localityImportance: 2
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.locality_importance
    }.from(nil).to(2)
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

  it 'Can update the talent_quality' do
    user = create(:user, application_status: :started, talent_quality: nil)
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          talentQuality: "CHEAP"
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.talent_quality
    }.from(nil).to('cheap')
  end

  it 'Can accept the guarantee_terms' do
    user =
      create(
        :user,
        application_status: :started, accepted_guarantee_terms_at: nil
      )
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          acceptGuaranteeTerms: true
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    AdvisableSchema.execute(query)
    expect(user.reload.accepted_guarantee_terms_at).to be_within(2.seconds).of(
      DateTime.now
    )
  end

  it 'Can set the accepted_guarantee_terms_at to nil' do
    user =
      create(
        :user,
        application_status: :started,
        accepted_guarantee_terms_at: 10.seconds.ago
      )
    query = <<-GRAPHQL
      mutation {
        updateClientApplication(input: {
          id: "#{user.uid}",
          acceptGuaranteeTerms: false
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL

    AdvisableSchema.execute(query)
    expect(user.reload.accepted_guarantee_terms_at).to be_nil
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

      expect { AdvisableSchema.execute(query) }.to change {
        user.reload.company_name
      }.from('Before').to('After')
    end
  end
end
