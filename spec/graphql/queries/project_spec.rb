require 'rails_helper'

describe 'project root query' do
  let(:user) { create(:user) }
  let(:project) { create(:project, user: user) }
  let(:query) {
    <<-GRAPHQL
    {
      project(id: #{project.airtable_id}) {
        id
        airtableId
      }
    }
    GRAPHQL
  }
  
  context "when a user is logged in" do
    it 'returns the project' do
      response = AdvisableSchema.execute(query, context: { current_user: user })
      expect(response["data"]["project"]["airtableId"]).to eq(project.airtable_id)
    end

    context "and the user does not own the project" do
      it "returns an error" do
        another_user = create(:user)
        response = AdvisableSchema.execute(query, context: { current_user: another_user })
        error = response["errors"].first
        expect(error["message"]).to eq("Invalid Permissions")
      end
    end
  end

  context "when there is no user logged in" do
    context "and the project user has an account" do
      it "returns 'authenticationRequired' error" do
        response = AdvisableSchema.execute(query, context: { current_user: nil })
        error = response["errors"].first
        expect(error["message"]).to eq("authenticationRequired")
      end
    end

    context "and the project user does not have an account" do
      let(:user) { create(:user, password: nil) }

      it "returns 'authenticationRequired' error" do
        response = AdvisableSchema.execute(query, context: { current_user: nil })
        error = response["errors"].first
        expect(error["message"]).to eq("signupRequired")
      end
    end
  end
end