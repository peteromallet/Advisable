# frozen_string_literal: true

require "rails_helper"

RSpec.describe ZappierInteractorController, type: :request do
  let(:key) { ENV["ACCOUNTS_CREATE_KEY"] }

  describe "POST /create_application" do
    let(:specialist) { create(:specialist) }
    let(:project) { create(:project) }
    let(:application_params) { {comment: "This is a comment"} }
    let(:extra_application_params) { {} }
    let(:extra_params) { {specialist_id: specialist.uid, project_id: project.uid} }
    let(:params) { {application: application_params.merge(extra_application_params), key: key}.merge(extra_params) }

    it "creates the application and returns its uid" do
      post("/zappier_interactor/create_application", params: params)
      expect(response).to have_http_status(:success)
      uid = JSON[response.body]["uid"]
      expect(uid).to be_present
      expect(Application).to exist(uid: uid)
    end

    context "when specialist is missing" do
      let(:extra_params) { {project_id: project.uid} }

      it "returns error" do
        post("/zappier_interactor/create_application", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON[response.body]["message"]).to eq("Couldn't find Specialist")
      end
    end

    context "when project is missing" do
      let(:extra_params) { {specialist_id: specialist.uid} }

      it "returns error" do
        post("/zappier_interactor/create_application", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON[response.body]["message"]).to eq("Couldn't find Project")
      end
    end

    context "when given unpermitted params" do
      let(:extra_application_params) { {airtable_id: "1234"} }

      it "ignores the param" do
        post("/zappier_interactor/create_application", params: params)
        uid = JSON[response.body]["uid"]
        application = Application.find_by(uid: uid)
        expect(application.airtable_id).not_to eq("1234")
      end
    end

    context "when no key" do
      let(:key) { '' }

      it "is unauthorized" do
        post("/zappier_interactor/create_application", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

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

  describe "POST /boost_guild_post" do
    let(:guild_post) { create(:guild_post, status: "published", guild_topic_list: [create(:guild_topic)]) }
    let(:post_id) { guild_post.id }
    let(:params) { {post_id: post_id, key: key} }

    context "when no key" do
      let(:key) { '' }

      it "is unauthorized" do
        post("/zappier_interactor/boost_guild_post", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when post does not satisfy requirements for boosting" do
      let(:guild_post) { create(:guild_post) }

      it "returns a descriptive error" do
        post("/zappier_interactor/boost_guild_post", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON[response.body]["error"]).to eq("Cannot boost a post with zero topics")
      end
    end

    it "boosts post" do
      post("/zappier_interactor/boost_guild_post", params: params)
      expect(response).to have_http_status(:success)
      expect(Guild::Post.find(post_id).boosted_at).to be_present
    end
  end
end
