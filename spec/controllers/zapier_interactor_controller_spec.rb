# frozen_string_literal: true

require "rails_helper"

RSpec.describe ZapierInteractorController, type: :request do
  let(:key) { ENV.fetch("ACCOUNTS_CREATE_KEY", nil) }

  describe "POST /update_interview" do
    let(:interview) { create(:interview, status: "Call Scheduled") }
    let(:status) { "Call Requested" }
    let(:params) { {status:, uid: interview.uid, key:} }

    it "updates the interview and syncs to airtable" do
      post("/zapier_interactor/update_interview", params:)
      expect(response).to have_http_status(:success)
      expect(interview.reload.status).to eq("Call Requested")
    end

    context "when given wrong status" do
      let(:status) { "Not a valid status" }

      it "ignores the param" do
        post("/zapier_interactor/update_interview", params:)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON[response.body]["message"]).to eq("Validation failed: Status is not included in the list")
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/update_interview", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_user" do
    let(:account) { create(:account) }
    let(:user) { create(:user, account:, title: "Old Title", campaign_name: "Old Name") }
    let(:params) { {uid: user.uid, key:} }

    before { allow_any_instance_of(User).to receive(:sync_to_airtable) }

    it "updates allowed fields" do
      post("/zapier_interactor/update_user", params: params.merge(campaign_name: "New Name"))
      expect(response).to have_http_status(:success)
      expect(user.reload.campaign_name).to eq("New Name")
    end

    it "can nullify an allowed field" do
      post("/zapier_interactor/update_user", params: params.merge(campaign_name: "-"))
      expect(response).to have_http_status(:success)
      expect(user.reload.campaign_name).to be_nil
    end

    it "does not update field that is not allowed" do
      post("/zapier_interactor/update_user", params: params.merge(title: "New Title"))
      expect(response).to have_http_status(:success)
      expect(user.reload.title).to eq("Old Title")
    end

    it "updates owner" do
      sp = create(:sales_person)
      post("/zapier_interactor/update_user", params: params.merge(owner: sp.uid))
      expect(response).to have_http_status(:success)
      expect(user.company.reload.sales_person_id).to eq(sp.id)
    end

    it "can nullify owner" do
      sp = create(:sales_person)
      user.company.update!(sales_person_id: sp.id)
      post("/zapier_interactor/update_user", params: params.merge(owner: "-"))
      expect(response).to have_http_status(:success)
      expect(user.company.reload.sales_person_id).to be_nil
    end

    describe "updating unsubscriptions" do
      context "when unsubscribed is nil" do
        let(:account) { create(:account, unsubscribed_from: nil) }

        it "adds new" do
          post("/zapier_interactor/update_user", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't fail removal" do
          post("/zapier_interactor/update_user", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end

      context "when unsubscribed has content" do
        let(:account) { create(:account, unsubscribed_from: ["All"]) }

        it "doesn't duplicate existing ones" do
          post("/zapier_interactor/update_user", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't duplicate existing ones when empty param" do
          post("/zapier_interactor/update_user", params: params.merge(unsubscribe_all: nil), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "adds new" do
          post("/zapier_interactor/update_user", params: params.merge(unsubscribe_sms_alerts: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to match_array(["All", "SMS Alerts"])
        end

        it "doesn't fail removal" do
          post("/zapier_interactor/update_user", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/update_user", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /update_specialist" do
    let(:account) { create(:account) }
    let(:specialist) { create(:specialist, account:, community_status: "Old Status", campaign_name: "Old Name") }
    let(:params) { {uid: specialist.uid, key:} }

    before { allow_any_instance_of(Specialist).to receive(:sync_to_airtable) }

    it "updates allowed fields" do
      post("/zapier_interactor/update_specialist", params: params.merge(campaign_name: "New Name"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.campaign_name).to eq("New Name")
    end

    it "can nullify an allowed field" do
      post("/zapier_interactor/update_specialist", params: params.merge(campaign_name: "-"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.campaign_name).to be_nil
    end

    it "does not update field that is not allowed" do
      post("/zapier_interactor/update_specialist", params: params.merge(community_status: "New Status"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.community_status).to eq("Old Status")
    end

    it "updates interviewer" do
      sp = create(:sales_person)
      post("/zapier_interactor/update_specialist", params: params.merge(interviewer: sp.uid))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.interviewer_id).to eq(sp.id)
    end

    it "can nullify interviewer" do
      sp = create(:sales_person)
      specialist.update!(interviewer_id: sp.id)
      post("/zapier_interactor/update_specialist", params: params.merge(interviewer: "-"))
      expect(response).to have_http_status(:success)
      expect(specialist.reload.interviewer_id).to be_nil
    end

    describe "updating unsubscriptions" do
      context "when unsubscribed is nil" do
        let(:account) { create(:account, unsubscribed_from: nil) }

        it "adds new" do
          post("/zapier_interactor/update_specialist", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't fail removal" do
          post("/zapier_interactor/update_specialist", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end

      context "when unsubscribed has content" do
        let(:account) { create(:account, unsubscribed_from: ["All"]) }

        it "doesn't duplicate existing ones" do
          post("/zapier_interactor/update_specialist", params: params.merge(unsubscribe_all: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "doesn't duplicate existing ones when empty param" do
          post("/zapier_interactor/update_specialist", params: params.merge(unsubscribe_all: nil), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq(["All"])
        end

        it "adds new" do
          post("/zapier_interactor/update_specialist", params: params.merge(unsubscribe_sms_alerts: true), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to match_array(["All", "SMS Alerts"])
        end

        it "doesn't fail removal" do
          post("/zapier_interactor/update_specialist", params: params.merge(unsubscribe_all: false), as: :json)
          expect(response).to have_http_status(:success)
          expect(account.reload.unsubscribed_from).to eq([])
        end
      end
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/update_specialist", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /create_magic_link" do
    let(:url) { "http://path.to/image.jpg" }
    let(:user) { create(:specialist) }
    let(:params) { {uid: user.uid, url:, key:} }

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/create_magic_link", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when specialist" do
      it "creates a magic link" do
        post("/zapier_interactor/create_magic_link", params:)
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        expect(link).to include("&mluid=#{user.account.uid}")
      end
    end

    context "when user" do
      let(:user) { create(:user) }

      it "creates a magic link" do
        post("/zapier_interactor/create_magic_link", params:)
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        expect(link).to include("&mluid=#{user.account.uid}")
      end
    end

    context "when account" do
      let(:user) { create(:account) }

      it "creates a magic link" do
        post("/zapier_interactor/create_magic_link", params:)
        expect(response).to have_http_status(:success)
        link = JSON[response.body]["magic_link"]
        expect(link).to include("&mluid=#{user.uid}")
      end
    end

    context "when provided expires_at" do
      let(:expires_at) { 1.month.from_now }

      it "creates a magic link" do
        post("/zapier_interactor/create_magic_link", params: params.merge(expires_at:))
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
    let(:params) { {uid: specialist.uid, key:} }

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/enable_guild", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    it "enables guild" do
      post("/zapier_interactor/enable_guild", params:)
      expect(response).to have_http_status(:success)
      expect(specialist.reload).to be_guild
      expect(GuildAddFollowablesJob).to have_been_enqueued.with(specialist.id)
    end
  end

  describe "POST /boost_guild_post" do
    let(:guild_post) { create(:guild_post, status: "published", labels: [create(:label)]) }
    let(:post_id) { guild_post.id }
    let(:params) { {post_id:, key:} }

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/boost_guild_post", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when post does not satisfy requirements for boosting" do
      let(:guild_post) { create(:guild_post) }

      it "returns a descriptive error" do
        post("/zapier_interactor/boost_guild_post", params:)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON[response.body]["error"]).to eq("Cannot boost a post with zero labels")
      end
    end

    it "boosts post" do
      post("/zapier_interactor/boost_guild_post", params:)
      expect(response).to have_http_status(:success)
      expect(Guild::Post.find(post_id).boosted_at).to be_present
    end
  end

  describe "POST /import_case_study" do
    let(:params) { {airtable_id: "asdf", key:} }
    let(:stub) { instance_double(Airtable::CaseStudy) }
    let(:article) { create(:case_study_article, airtable_id: "asdf") }

    it "imports case study" do
      allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_return(stub)
      allow(stub).to receive(:article_record).and_return(article)
      post("/zapier_interactor/import_case_study", params:)
      expect(response).to have_http_status(:success)
      expect(CaseStudyImportJob).to have_been_enqueued.with(article)
      json = JSON[response.body]
      expect(json["airtable_id"]).to eq("asdf")
      expect(json["uid"]).to eq(article.uid)
    end

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/import_case_study", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when case study not found in airtable" do
      it "tells so in the error response" do
        allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_raise(Airrecord::Error, "HTTP 404: : ")
        post("/zapier_interactor/import_case_study", params:)
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON[response.body]
        expect(json["error"]).to eq("Case Study not found")
      end
    end

    context "when some other airtable error" do
      it "tells so in the error response" do
        allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_raise(Airrecord::Error, "It's raining in them tables")
        post("/zapier_interactor/import_case_study", params:)
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON[response.body]
        expect(json["error"]).to eq("Airtable communication error")
      end
    end

    context "when something goes wrong when creating article" do
      it "tells so in the error response" do
        allow(Airtable::CaseStudy).to receive(:find).with("asdf").and_return(stub)
        allow(stub).to receive(:article_record).and_raise(ActiveRecord::RecordNotFound, "Couldn't find Specialist")
        post("/zapier_interactor/import_case_study", params:)
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON[response.body]
        expect(json["error"]).to eq("Something went wrong")
      end
    end
  end

  describe "POST /send_email" do
    let(:user) { create(:specialist) }
    let(:params) { {uid: user.uid, subject: "Subject", body: "<h1>Heya!</h1>", key:} }

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/send_email", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when specialist" do
      it "sends the email" do
        post("/zapier_interactor/send_email", params:)
        expect(response).to have_http_status(:success)
        expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "zapier_email", "deliver_now", {args: [user.account, "Subject", "<h1>Heya!</h1>"]})
      end
    end

    context "when user" do
      let(:user) { create(:user) }

      it "sends the email" do
        post("/zapier_interactor/send_email", params:)
        expect(response).to have_http_status(:success)
        expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "zapier_email", "deliver_now", {args: [user.account, "Subject", "<h1>Heya!</h1>"]})
      end
    end

    context "when account" do
      let(:user) { create(:account) }

      it "sends the email" do
        post("/zapier_interactor/send_email", params:)
        expect(response).to have_http_status(:success)
        expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "zapier_email", "deliver_now", {args: [user, "Subject", "<h1>Heya!</h1>"]})
      end
    end
  end

  describe "POST /create_message" do
    let(:user) { create(:user) }
    let(:account_ids) { [user.uid] }
    let(:params) { {uids: account_ids, author: user.uid, content: "Content", key:} }

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/create_message", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    describe "creates a message" do
      let(:account_ids) { [user.uid, second_uid] }

      context "when specialist" do
        let(:second) { create(:specialist) }
        let(:second_uid) { second.uid }

        it "creates the message between user and second" do
          post("/zapier_interactor/create_message", params:)
          expect(response).to have_http_status(:success)
          uid = JSON[response.body]["conversation"]
          conversation = Conversation.find_by(uid:)
          expect(conversation.messages.count).to eq(1)
          expect(conversation.participants.pluck(:account_id)).to match_array([user.account_id, second.account_id])
          message = conversation.messages.last
          expect(message.author).to eq(user.account)
          expect(message.content).to eq("Content")
        end
      end

      context "when user" do
        let(:second) { create(:user) }
        let(:second_uid) { second.uid }

        it "creates the message between user and second" do
          post("/zapier_interactor/create_message", params:)
          expect(response).to have_http_status(:success)
          uid = JSON[response.body]["conversation"]
          conversation = Conversation.find_by(uid:)
          expect(conversation.messages.count).to eq(1)
          expect(conversation.participants.pluck(:account_id)).to match_array([user.account_id, second.account_id])
          message = conversation.messages.last
          expect(message.author).to eq(user.account)
          expect(message.content).to eq("Content")
        end
      end

      context "when account" do
        let(:second) { create(:specialist) }
        let(:second_uid) { second.account.uid }

        it "creates the message between user and second" do
          post("/zapier_interactor/create_message", params:)
          expect(response).to have_http_status(:success)
          uid = JSON[response.body]["conversation"]
          conversation = Conversation.find_by(uid:)
          expect(conversation.messages.count).to eq(1)
          expect(conversation.participants.pluck(:account_id)).to match_array([user.account_id, second.account_id])
          message = conversation.messages.last
          expect(message.author).to eq(user.account)
          expect(message.content).to eq("Content")
        end
      end

      context "with existing conversation" do
        let(:second) { create(:specialist) }
        let(:second_uid) { second.uid }

        it "creates a message in existing conversation" do
          conversation = Conversation.by_accounts([user.account, second.account])
          conversation.new_message!(author: second.account, content: "Existing message")
          post("/zapier_interactor/create_message", params:)
          expect(response).to have_http_status(:success)
          uid = JSON[response.body]["conversation"]
          conversation = Conversation.find_by(uid:)
          expect(conversation.messages.count).to eq(2)
          expect(conversation.participants.pluck(:account_id)).to match_array([user.account_id, second.account_id])
          message = conversation.messages.last
          expect(message.author).to eq(user.account)
          expect(message.content).to eq("Content")
        end
      end

      context "when no author" do
        let(:params) { {uids: account_ids, content: "Content", key:} }
        let(:second) { create(:specialist) }
        let(:second_uid) { second.uid }

        it "creates a system message between user and second" do
          post("/zapier_interactor/create_message", params:)
          expect(response).to have_http_status(:success)
          uid = JSON[response.body]["conversation"]
          conversation = Conversation.find_by(uid:)
          expect(conversation.messages.count).to eq(1)
          expect(conversation.participants.pluck(:account_id)).to match_array([user.account_id, second.account_id])
          message = conversation.messages.last
          expect(message.author).to be_nil
          expect(message).to be_system_message
          expect(message.content).to eq("Content")
        end
      end
    end
  end

  describe "POST /create_or_update_case_study" do
    let(:params) { {title: "New Title", company_name: "ACME", key:} }

    context "when no key" do
      let(:key) { "" }

      it "is unauthorized" do
        post("/zapier_interactor/create_or_update_case_study", params:)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when no UID" do
      let(:specialist) { create(:specialist) }

      it "creates the article" do
        post("/zapier_interactor/create_or_update_case_study", params: params.merge(specialist: specialist.uid))
        expect(response).to have_http_status(:success)
        article = CaseStudy::Article.find_by(uid: JSON[response.body]["case_study"])
        expect(article.title).to eq("New Title")
        expect(article.company.name).to eq("ACME")
      end
    end

    context "when UID" do
      let(:article) { create(:case_study_article, hide_from_search: true, subtitle: "Old Subtitle") }

      it "updates the article respecting false value and nullifying `-` value" do
        post("/zapier_interactor/create_or_update_case_study", params: params.merge(uid: article.uid, subtitle: "-", hide_from_search: false))
        expect(response).to have_http_status(:success)
        article.reload
        expect(JSON[response.body]["case_study"]).to eq(article.uid)
        expect(article.title).to eq("New Title")
        expect(article.subtitle).to be_nil
        expect(article.hide_from_search).to be(false)
        expect(article.company.name).to eq("ACME")
      end
    end
  end
end
