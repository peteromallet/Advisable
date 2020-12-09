require "rails_helper"

RSpec.describe ZappierInteractorController, type: :request do
  let(:key) { ENV["ACCOUNTS_CREATE_KEY"] }

  describe "POST /attach_previous_project_image" do
    let(:previous_project) { create(:previous_project) }
    let(:image) { "http://path.to/image.jpg" }
    let(:params) { {uid: previous_project.uid, image_url: image, key: key} }

    it "enqueues the job" do
      post("/zappier_interactor/attach_previous_project_image", params: params)
      expect(response).to have_http_status(:success)
      expect(AttachImageJob).to have_been_enqueued.with(previous_project, image)
    end

    context "when no key" do
      let(:key) { '' }

      it "is unauthorized" do
        post("/zappier_interactor/attach_previous_project_image", params: params)
        expect(response).to have_http_status(:unauthorized)
        expect(AttachImageJob).not_to have_been_enqueued.with(previous_project, image)
      end
    end

    context "when no image" do
      let(:image) { nil }

      it "is unprocessable" do
        post("/zappier_interactor/attach_previous_project_image", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(AttachImageJob).not_to have_been_enqueued.with(previous_project, image)
      end
    end

    context "when non-existing project" do
      it "is unprocessable" do
        params[:uid] = 'pre_does_not_exist'
        post("/zappier_interactor/attach_previous_project_image", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(AttachImageJob).not_to have_been_enqueued.with(previous_project, image)
      end
    end
  end

  describe "POST /create_magic_link" do
    let(:url) { "http://path.to/image.jpg" }
    let(:user) { create(:specialist) }
    let(:params) { {uid: user.uid, url: url, key: key} }

    context "when no key" do
      let(:key) { '' }

      it "is unauthorized" do
        post("/zappier_interactor/create_magic_link", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when specialist" do
      it "creates a magic link" do
        post("/zappier_interactor/create_magic_link", params: params)
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        expect(link).to include("&mluid=#{user.account.uid}")
      end
    end

    context "when user" do
      let(:user) { create(:user) }

      it "creates a magic link" do
        post("/zappier_interactor/create_magic_link", params: params)
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        expect(link).to include("&mluid=#{user.account.uid}")
      end
    end

    context "when account" do
      let(:user) { create(:account) }

      it "creates a magic link" do
        post("/zappier_interactor/create_magic_link", params: params)
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        expect(link).to include("&mluid=#{user.uid}")
      end
    end

    context "when provided expires_at" do
      let(:expires_at) { 1.month.from_now }

      it "creates a magic link" do
        post("/zappier_interactor/create_magic_link", params: params.merge(expires_at: expires_at))
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        params = CGI.parse(URI.parse(link).query)
        magic = user.account.magic_links.where(path: "/image.jpg").find do |ml|
          ml.valid_token(params["mlt"].first)
        end
        expect(magic.expires_at.to_i).to eq(expires_at.to_i)
      end
    end
  end

  describe "POST /enable_guild" do
    let(:specialist) { create(:specialist, guild: false) }
    let(:params) { {uid: specialist.uid, key: key} }

    context "when no key" do
      let(:key) { '' }

      it "is unauthorized" do
        post("/zappier_interactor/enable_guild", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    it "enables guild" do
      post("/zappier_interactor/enable_guild", params: params)
      expect(response).to have_http_status(:success)
      expect(specialist.reload).to be_guild
      expect(GuildAddFollowablesJob).to have_been_enqueued.with(specialist.id)
    end
  end
end
