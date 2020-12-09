require "rails_helper"

RSpec.describe Mutations::DeleteSpecialist do
  let(:user) { create(:specialist) }
  let(:context) { {current_user: user, session_manager: session_manager} }
  let(:session_manager) { instance_spy(SessionManager) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteSpecialist(input: {}) {
        status
      }
    }
    GRAPHQL
  end

  it "deletes the specialist" do
    id = user.id
    response = AdvisableSchema.execute(query, context: context)
    expect(session_manager).to have_received(:logout)
    expect(Specialist.where(id: id)).to be_empty
  end

  context "when clientuser" do
    let(:user) { create(:user) }

    it "can not delete the answer" do
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"].first["message"]).to eq("Current user must be a Specialist.")
    end
  end
end
