require "rails_helper"

RSpec.describe "Projects", type: :request do
  let(:project) { create(:project, status: "Brief Confirmed") }
  let(:headers) { {"ACCEPT" => "application/json"} }
  let(:params) { {project_id: project.uid, key: ENV["PROJECTS_INVITE_KEY"]} }

  describe "POST /send_invites" do
    before { allow_any_instance_of(Project).to receive(:sync_from_airtable) }

    context "invitable project" do
      it "schedules invite job" do
        post "/projects/send_invites", params: params, headers: headers

        expect(response.content_type).to eq("application/json; charset=utf-8")
        expect(response).to have_http_status(:ok)
        expect(SendApplicationInvitesJob).to have_been_enqueued.with(project)
      end
    end

    context "no invite key" do
      let(:params) { {project_id: project.uid} }

      it "returns unauthorized" do
        post "/projects/send_invites", params: params, headers: headers

        expect(response).to have_http_status(:unauthorized)
        expect(SendApplicationInvitesJob).not_to have_been_enqueued
      end
    end

    context "project not in brief confirmed state" do
      let(:project) { create(:project, status: "Pending") }

      it "returns unprocessable_entity" do
        post "/projects/send_invites", params: params, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(SendApplicationInvitesJob).not_to have_been_enqueued
      end
    end
  end
end
