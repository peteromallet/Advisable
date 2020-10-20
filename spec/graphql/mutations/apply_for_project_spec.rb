require "rails_helper"

RSpec.describe Mutations::ApplyForProject do
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project, status: "Brief Confirmed", brief_confirmed_at: 2.hours.ago) }
  let(:context) { {current_user: specialist} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      applyForProject(input: {
        project: "#{project.uid}"
      }) {
        application {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  it "syncs to airtable and returns application" do
    expect_any_instance_of(Application).to receive(:save_and_sync!)
    response = AdvisableSchema.execute(query, context: context)
    expect(response["data"]["applyForProject"]["application"]).to include({"status" => "Invited To Apply"})

    application = Application.find_by_uid!(response["data"]["applyForProject"]["application"]["id"])
    expect(application.attributes.slice("status", "accepts_fee", "accepts_terms", "featured", "references_requested")).to eq({"accepts_fee" => false, "accepts_terms" => false, "featured" => false, "references_requested" => false, "status" => "Invited To Apply"})
  end

  context 'application exists already' do
    let!(:application) { create(:application, project: project, specialist: specialist, status: "Applied") }

    it "syncs to airtable and returns application" do
      expect_any_instance_of(Application).to receive(:save_and_sync!)
      response = AdvisableSchema.execute(query, context: context)
      expect(response["data"]["applyForProject"]["application"]).to eq({"id" => application.uid, "status" => application.status})
    end
  end

  describe "errors" do
    context "specialist not logged in" do
      let(:context) { {current_user: nil} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("NOT_AUTHENTICATED")
      end
    end

    context "logged in user not a specialist" do
      let(:context) { {current_user: create(:user)} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("INVALID_REQUEST")
      end
    end

    context "has not been confirmed" do
      let(:project) { create(:project, brief_confirmed_at: nil) }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["code"]
        expect(error).to eq("PROJECT_NOT_CONFIRMED")
      end
    end

    context "application with wrong status exists" do
      let!(:application) { create(:application, project: project, specialist: specialist, status: "Application Accepted") }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["code"]
        expect(error).to eq("APPLICATION_IN_A_WRONG_STATE")
      end
    end
  end
end
