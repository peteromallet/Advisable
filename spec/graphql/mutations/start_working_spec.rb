
require "rails_helper"

describe Mutations::StartWorking do
  let!(:application) { create(:application) }
  let(:query) { %|
    mutation {
      startWorking(input: {
        application: #{application.airtable_id},
      }) {
        application {
          id
          status
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  context "when a user is signed in" do
    context "and the user owns the project" do
      let(:context) { { current_user: application.project.user } }
      let(:response) {
        AdvisableSchema.execute(
          query,
          context: context
        )
      }
      
      it "sets the status to 'Working'" do
        status = response["data"]["startWorking"]["application"]["status"]
        expect(status).to eq("Working")
      end
    end

    context "and the user does not have access to the project" do
      let(:context) { { current_user: create(:user) } }
      let(:response) {
        AdvisableSchema.execute(
          query,
          context: context
        )
      }
  
      it "returns a not_authorized error" do
        errors = response["data"]["startWorking"]["errors"]
        expect(errors[0]["code"]).to eq("not_authorized")
      end
    end
  end

  context "when there is no user signed in" do
    let(:context) { { current_user: nil } }
    let(:response) {
      AdvisableSchema.execute(
        query,
        context: context
      )
    }

    it "returns a not_authorized error" do
      errors = response["data"]["startWorking"]["errors"]
      expect(errors[0]["code"]).to eq("not_authorized")
    end
  end

  context "when a Service::Error is thrown" do
    it "includes it in the response" do
      error = Service::Error.new("service_error")
      allow(Applications::StartWorking).to receive(:call).and_raise(error)
      context = { current_user: application.project.user }
      response = AdvisableSchema.execute(query, context: context)
      errors = response["data"]["startWorking"]["errors"]
      expect(errors[0]["code"]).to eq("service_error")
    end
  end
end