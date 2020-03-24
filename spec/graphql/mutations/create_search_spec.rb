require 'rails_helper'

describe Mutations::CreateSearch do
  let(:user) { create(:user, industry: nil, company_type: nil) }
  let(:skill) { create(:skill, name: 'Testing') }
  let(:industry) { create(:industry, name: 'Design') }
  let(:company_type) { 'Startup' }
  let(:context) { { current_user: user } }
  let(:query) do
    <<-GRAPHQL
      mutation {
        createSearch(input: {
          skill: "#{skill.name}",
          industry: "#{industry.name}",
          companyType: "#{company_type}"
        }) {
          search {
            id
          }
        }
      }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'creates a new search record for the user' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      user.searches.count
    }.by(1)
  end

  it 'udpates the users industry' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      user.reload.industry
    }.from(nil)
      .to(industry)
  end

  it 'udpates the users company_type' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      user.reload.company_type
    }.from(nil)
      .to(company_type)
  end

  it 'calls #create_recommendation' do
    expect_any_instance_of(Search).to receive(:create_recommendation)
    AdvisableSchema.execute(query, context: context)
  end

  context 'when not logged in' do
    let(:user) { nil }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when logged in as a specialist' do
    let(:user) { create(:specialist) }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('viewerIsSpecialist')
    end
  end
end
