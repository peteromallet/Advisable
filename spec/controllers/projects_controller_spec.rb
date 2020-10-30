require "rails_helper"

RSpec.describe ProjectsController, type: :request do
  let(:project) { create(:project, sales_status: "Open") }
  let(:headers) { {"ACCEPT" => "application/json"} }
  let(:params) { {project_id: project.uid, key: ENV["PROJECTS_INVITE_KEY"]} }

  before { allow_any_instance_of(Project).to receive(:sync_from_airtable) }

  describe "POST /send_invites" do
    context "invitable project" do
      it "schedules invite job" do
        post "/projects/send_invites", params: params, headers: headers

        expect(response.content_type).to eq("application/json; charset=utf-8")
        expect(response).to have_http_status(:ok)
        expect(SendApplicationInformationJob).to have_been_enqueued.with(project)
      end
    end

    context "no key" do
      let(:params) { {project_id: project.uid} }

      it "returns unauthorized" do
        post "/projects/send_invites", params: params, headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(SendApplicationInformationJob).not_to have_been_enqueued
      end
    end

    context "no primary skill" do
      it "returns unauthorized" do
        project.primary_skill = nil
        post "/projects/send_invites", params: params, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(SendApplicationInformationJob).not_to have_been_enqueued
      end
    end

    context "project not Open" do
      let(:project) { create(:project, sales_status: "Won") }

      it "returns unprocessable_entity" do
        post "/projects/send_invites", params: params, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(SendApplicationInformationJob).not_to have_been_enqueued
      end
    end
  end

  describe "POST /create_linkedin_ad" do
    context "no linkedin ad auth" do
      it "returns unprocessable" do
        post "/projects/create_linkedin_ad", params: params, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(CreateLinkedinAdJob).not_to have_been_enqueued
      end
    end

    context "no key" do
      let(:params) { {project_id: project.uid} }

      it "returns unauthorized" do
        post "/projects/create_linkedin_ad", params: params, headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(CreateLinkedinAdJob).not_to have_been_enqueued
      end
    end

    context "happy path" do
      let(:account) { create(:account) }
      before { AuthProvider.create!(provider: "linkedin_ads", uid: "1234", account: account) }

      it "schedules create linkedin ad job" do
        post "/projects/create_linkedin_ad", params: params, headers: headers

        expect(response.content_type).to eq("application/json; charset=utf-8")
        expect(response).to have_http_status(:ok)
        expect(CreateLinkedinAdJob).to have_been_enqueued.with(project)
      end
    end
  end
end
