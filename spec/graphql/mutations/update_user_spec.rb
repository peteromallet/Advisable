require 'rails_helper'

describe Mutations::UpdateTask do
  let(:user) do
    create(
      :user,
      company_type: 'Major Corporation',
      industry: create(:industry, name: 'Marketing')
    )
  end

  let(:query) {}

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'can update the industry' do
    industry = create(:industry, name: 'Advertising')
    expect {
      AdvisableSchema.execute(
        query("{ industry: \"Advertising\" }"),
        context: { current_user: user }
      )
    }.to change { user.reload.industry }.to(industry)
  end

  it 'can update the company_type' do
    industry = create(:industry, name: 'Advertising')
    expect {
      AdvisableSchema.execute(
        query("{ companyType: \"Startup\" }"),
        context: { current_user: user }
      )
    }.to change { user.reload.company_type }.to('Startup')
  end

  context 'when not logged in' do
    it 'returns an error' do
      response =
        AdvisableSchema.execute(
          query("{ companyType: \"Startup\" }"),
          context: { current_user: nil }
        )
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('NOT_AUTHENTICATED')
    end
  end

  def query(input)
    <<-GRAPHQL
    mutation {
      updateUser(input: #{input}) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end
end
