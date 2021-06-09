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

    before { allow_any_instance_of(Application).to receive(:sync_to_airtable) }

    it "creates the application, syncs to airtable, and returns its uid" do
      expect_any_instance_of(Application).to receive(:sync_to_airtable)

      post("/zappier_interactor/create_application", params: params)
      expect(response).to have_http_status(:success)
      application = Application.find_by(uid: JSON[response.body]["uid"])
      expect(application.comment).to eq("This is a comment")
    end

    context "when sending meta fields" do
      let(:extra_application_params) { {working_5_days_in_client_feedback: "No feedback"} }

      it "updates them" do
        post("/zappier_interactor/create_application", params: params)
        expect(response).to have_http_status(:success)
        application = Application.find_by(uid: JSON[response.body]["uid"])
        expect(application.meta_fields["Working - 5 Days In - Client Feedback"]).to eq("No feedback")
      end
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
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/create_application", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_application" do
    let(:application) { create(:application) }
    let(:application_params) { {comment: "This is a comment", source: "And this is the source"} }
    let(:extra_application_params) { {} }
    let(:params) { {application: application_params.merge(extra_application_params), uid: application.uid, key: key} }

    before { allow_any_instance_of(Application).to receive(:sync_to_airtable) }

    it "updates the application and syncs to airtable" do
      expect_any_instance_of(Application).to receive(:sync_to_airtable)
      post("/zappier_interactor/update_application", params: params)
      expect(response).to have_http_status(:success)
      application.reload
      expect(application.comment).to eq("This is a comment")
      expect(application.source).to eq("And this is the source")
    end

    context "when sending meta fields" do
      let(:extra_application_params) { {"working_5_days_in_client_feedback" => "No feedback"} }

      it "updates them" do
        post("/zappier_interactor/update_application", params: params)
        expect(response).to have_http_status(:success)
        application.reload
        expect(application.meta_fields["Working - 5 Days In - Client Feedback"]).to eq("No feedback")
      end
    end

    context "when application has existing meta fields" do
      let(:application) { create(:application, meta_fields: {"Working - 5 Days In - Specialist Feedback" => "Not great. Not terrible.", "Working - 5 Days In - Client Feedback" => "Overwrite me."}) }

      let(:extra_application_params) { {"working_5_days_in_client_feedback" => "No feedback"} }

      it "does not overwrite them" do
        post("/zappier_interactor/update_application", params: params)
        expect(response).to have_http_status(:success)
        application.reload
        expect(application.meta_fields["Working - 5 Days In - Specialist Feedback"]).to eq("Not great. Not terrible.")
        expect(application.meta_fields["Working - 5 Days In - Client Feedback"]).to eq("No feedback")
      end
    end

    context "when given unpermitted params" do
      let(:extra_application_params) { {airtable_id: "1234"} }

      it "ignores the param" do
        post("/zappier_interactor/update_application", params: params)
        expect(application.reload.airtable_id).not_to eq("1234")
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/update_application", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_interview" do
    let(:interview) { create(:interview, status: "Call Scheduled") }
    let(:status) { "Call Requested" }
    let(:params) { {status: status, uid: interview.uid, key: key} }

    before { allow_any_instance_of(Application).to receive(:sync_to_airtable) }

    it "updates the interview and syncs to airtable" do
      post("/zappier_interactor/update_interview", params: params)
      expect(response).to have_http_status(:success)
      expect(interview.reload.status).to eq("Call Requested")
    end

    context "when given wrong status" do
      let(:status) { "Not a valid status" }

      it "ignores the param" do
        post("/zappier_interactor/update_interview", params: params)
        expect(response.status).to eq(422)
        expect(JSON[response.body]["message"]).to eq("Validation failed: Status is not included in the list")
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/update_interview", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_consultation" do
    let(:consultation) { create(:consultation, status: "Call Scheduled") }
    let(:status) { "Call Requested" }
    let(:params) { {status: status, uid: consultation.uid, key: key} }

    before { allow_any_instance_of(Consultation).to receive(:sync_to_airtable) }

    it "updates the consultation and syncs to airtable" do
      post("/zappier_interactor/update_consultation", params: params)
      expect(response).to have_http_status(:success)
      expect(consultation.reload.status).to eq("Call Requested")
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/update_consultation", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_user" do
    let(:account) { create(:account) }
    let(:user) { create(:user, account: account, title: "Old Title", campaign_name: "Old Name") }
    let(:params) { {uid: user.uid, key: key} }

    before { allow_any_instance_of(User).to receive(:sync_to_airtable) }

    it "updates allowed fields" do
      post("/zappier_interactor/update_user", params: params.merge(campaign_name: "New Name"))
      expect(response).to have_http_status(:success)
      expect(user.reload.campaign_name).to eq("New Name")
    end

    it "can nullify an allowed field" do
      post("/zappier_interactor/update_user", params: params.merge(campaign_name: "-"))
      expect(response).to have_http_status(:success)
      expect(user.reload.campaign_name).to be_nil
    end

    it "does not update field that is not allowed" do
      post("/zappier_interactor/update_user", params: params.merge(title: "New Title"))
      expect(response).to have_http_status(:success)
      expect(user.reload.title).to eq("Old Title")
    end

    it "updates owner" do
      sp = create(:sales_person)
      post("/zappier_interactor/update_user", params: params.merge(owner: sp.uid))
      expect(response).to have_http_status(:success)
      expect(user.company.reload.sales_person_id).to eq(sp.id)
    end

    it "can nullify owner" do
      sp = create(:sales_person)
      user.company.update!(sales_person_id: sp.id)
      post("/zappier_interactor/update_user", params: params.merge(owner: "-"))
      expect(response).to have_http_status(:success)
      expect(user.company.reload.sales_person_id).to be_nil
    end

    describe "updating unsubscriptions" do
      context "when unsubscribed is nil" do
        let(:account) { create(:account, unsubscribed_from: nil) }

        it "adds new" do
          post("/zappier_interactor/update_user", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't fail removal" do
          post("/zappier_interactor/update_user", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end

      context "when unsubscribed has content" do
        let(:account) { create(:account, unsubscribed_from: ["All"]) }

        it "doesn't duplicate existing ones" do
          post("/zappier_interactor/update_user", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't duplicate existing ones when empty param" do
          post("/zappier_interactor/update_user", params: params.merge(unsubscribe_all: nil), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "adds new" do
          post("/zappier_interactor/update_user", params: params.merge(unsubscribe_sms_alerts: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to match_array(["All", "SMS Alerts"])
        end

        it "doesn't fail removal" do
          post("/zappier_interactor/update_user", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/update_user", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_specialist" do
    let(:account) { create(:account) }
    let(:specialist) { create(:specialist, account: account, community_status: "Old Status", campaign_name: "Old Name") }
    let(:params) { {uid: specialist.uid, key: key} }

    before { allow_any_instance_of(Specialist).to receive(:sync_to_airtable) }

    it "updates allowed fields" do
      post("/zappier_interactor/update_specialist", params: params.merge(campaign_name: "New Name"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.campaign_name).to eq("New Name")
    end

    it "can nullify an allowed field" do
      post("/zappier_interactor/update_specialist", params: params.merge(campaign_name: "-"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.campaign_name).to be_nil
    end

    it "does not update field that is not allowed" do
      post("/zappier_interactor/update_specialist", params: params.merge(community_status: "New Status"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.community_status).to eq("Old Status")
    end

    it "updates interviewer" do
      sp = create(:sales_person)
      post("/zappier_interactor/update_specialist", params: params.merge(interviewer: sp.uid))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.interviewer_id).to eq(sp.id)
    end

    it "can nullify interviewer" do
      sp = create(:sales_person)
      specialist.update!(interviewer_id: sp.id)
      post("/zappier_interactor/update_specialist", params: params.merge(interviewer: "-"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.interviewer_id).to be_nil
    end

    describe "updating unsubscriptions" do
      context "when unsubscribed is nil" do
        let(:account) { create(:account, unsubscribed_from: nil) }

        it "adds new" do
          post("/zappier_interactor/update_specialist", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't fail removal" do
          post("/zappier_interactor/update_specialist", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end

      context "when unsubscribed has content" do
        let(:account) { create(:account, unsubscribed_from: ["All"]) }

        it "doesn't duplicate existing ones" do
          post("/zappier_interactor/update_specialist", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't duplicate existing ones when empty param" do
          post("/zappier_interactor/update_specialist", params: params.merge(unsubscribe_all: nil), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "adds new" do
          post("/zappier_interactor/update_specialist", params: params.merge(unsubscribe_sms_alerts: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to match_array(["All", "SMS Alerts"])
        end

        it "doesn't fail removal" do
          post("/zappier_interactor/update_specialist", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/update_specialist", params: params)
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
      let(:key) { "" }

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
      let(:key) { "" }

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
      let(:key) { "" }

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
    let(:guild_post) { create(:guild_post, status: "published", labels: [create(:label)]) }
    let(:post_id) { guild_post.id }
    let(:params) { {post_id: post_id, key: key} }

    context "when no key" do
      let(:key) { "" }

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
        expect(JSON[response.body]["error"]).to eq("Cannot boost a post with zero labels")
      end
    end

    it "boosts post" do
      post("/zappier_interactor/boost_guild_post", params: params)
      expect(response).to have_http_status(:success)
      expect(Guild::Post.find(post_id).boosted_at).to be_present
    end
  end

  describe "POST /import_case_study" do
    let(:params) { {airtable_id: "asdf", key: key} }
    let(:stub) { instance_double(Airtable::CaseStudy) }
    let(:article) { build_stubbed(:case_study_article, airtable_id: "asdf") }

    it "imports case study" do
      allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_return(stub)
      allow(stub).to receive(:import!).and_return(article)
      post("/zappier_interactor/import_case_study", params: params)
      expect(response).to have_http_status(:success)
      json = JSON[response.body]
      expect(json["airtable_id"]).to eq("asdf")
      expect(json["uid"]).to eq(article.uid)
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zappier_interactor/import_case_study", params: params)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when case study not found in airtable" do
      it "tells so in the error response" do
        allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_raise(Airrecord::Error, "HTTP 404: : ")
        post("/zappier_interactor/import_case_study", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON[response.body]
        expect(json["error"]).to eq("Case Study not found")
      end
    end

    context "when some other airtable error" do
      it "tells so in the error response" do
        allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_raise(Airrecord::Error, "It's raining in them tables")
        post("/zappier_interactor/import_case_study", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON[response.body]
        expect(json["error"]).to eq("Airtable communication error")
      end
    end

    context "when something goes wrong when importing" do
      it "tells so in the error response" do
        allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_return(stub)
        allow(stub).to receive(:import!).and_raise(ActiveRecord::RecordNotFound, "Couldn't find Specialist")
        post("/zappier_interactor/import_case_study", params: params)
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON[response.body]
        expect(json["error"]).to eq("Something went wrong")
      end
    end
  end
end
