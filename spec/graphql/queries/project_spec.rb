require 'rails_helper'

RSpec.describe 'project root query' do
  let(:user) { create(:user) }
  let(:project) { create(:project, user: user) }
  let(:query) do
    <<-GRAPHQL
    {
      project(id: "#{project.airtable_id}") {
        id
        airtableId
        viewerCanAccess
      }
    }
    GRAPHQL
  end

  context 'when a user is logged in' do
    it 'returns the project' do
      response = AdvisableSchema.execute(query, context: { current_user: user })
      expect(response['data']['project']['airtableId']).to eq(
        project.airtable_id
      )
    end

    context 'and does not own the project' do
      it 'returns viewerCanAccess false' do
        another_user = create(:user)
        response =
          AdvisableSchema.execute(
            query,
            context: { current_user: another_user }
          )
        expect(response['data']['project']['viewerCanAccess']).to be_falsey
      end
    end
  end

  context 'when there is no user logged in' do
    context 'and the project user has an account' do
      it "returns 'authenticationRequired' error" do
        response =
          AdvisableSchema.execute(query, context: { current_user: nil })
        error = response['errors'].first
        expect(error['extensions']['code']).to eq('notAuthenticated')
      end
    end

    context 'and the project user does not have an account' do
      let(:user) { create(:user, password: nil) }

      it "returns 'authenticationRequired' error" do
        response =
          AdvisableSchema.execute(query, context: { current_user: nil })
        error = response['errors'].first
        expect(error['extensions']['code']).to eq('SIGNUP_REQUIRED')
      end
    end
  end
end
