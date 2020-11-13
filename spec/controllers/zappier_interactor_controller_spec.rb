require "rails_helper"

RSpec.describe ZappierInteractorController, type: :request do
  describe "POST /attach_previous_project_image" do
    let(:previous_project) { create(:previous_project) }
    let(:image) { "http://path.to/image.jpg" }
    let(:key) { ENV["ACCOUNTS_CREATE_KEY"] }
    let(:params) { {uid: previous_project.uid, image_url: image, key: key} }

    it "enqueues the job" do
      post("/zappier_interactor/attach_previous_project_image", params: params)
      expect(response).to have_http_status(:success)
      expect(AttachImageJob).to have_been_enqueued.with(previous_project, image)
    end

    context "no key" do
      let(:key) { '' }

      it "is unauthorized" do
        post("/zappier_interactor/attach_previous_project_image", params: params)
        expect(response).to have_http_status(:unauthorized)
        expect(AttachImageJob).not_to have_been_enqueued.with(previous_project, image)
      end
    end

    context "no image" do
      let(:image) { nil }

      it "is unprocessable" do
        post("/zappier_interactor/attach_previous_project_image", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(AttachImageJob).not_to have_been_enqueued.with(previous_project, image)
      end
    end

    context "non-existing project" do
      it "is unprocessable" do
        params[:uid] = 'pre_does_not_exist'
        post("/zappier_interactor/attach_previous_project_image", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(AttachImageJob).not_to have_been_enqueued.with(previous_project, image)
      end
    end
  end
end
