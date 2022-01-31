# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ManageSubscription do
  let(:account) { create(:account, unsubscribed_from: ["SMS Alerts", "Onboarding Emails"]) }
  let(:subscription) { "SMS Alerts" }
  let(:action) { "subscribe" }
  let(:context) { {current_user:, current_account: account} }
  let(:query) do
    <<-GRAPHQL
    mutation {
      manageSubscription(input: {
        action: "#{action}",
        subscription: "#{subscription}"
      }) {
        account {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when specialist" do
    let(:current_user) { create(:specialist, account:) }

    describe "subscribe" do
      it "updates subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(account.id)
        expect(account.unsubscribed_from).to match_array(["Onboarding Emails"])
      end
    end

    describe "subscribe to the thing already subscribed to" do
      let(:subscription) { "Status Surveys" }

      it "does not change subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(nil)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails"])
      end
    end

    describe "unsubscribe" do
      let(:subscription) { "Status Surveys" }
      let(:action) { "unsubscribe" }

      it "updates subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(account.id)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails", "Status Surveys"])
      end
    end

    describe "unsubscribe from the thing already unsubscribed from" do
      let(:action) { "unsubscribe" }

      it "does not change subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(nil)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails"])
      end
    end
  end

  context "when user" do
    let(:current_user) { create(:user, account:) }

    describe "subscribe" do
      it "updates subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(account.id)
        expect(account.unsubscribed_from).to match_array(["Onboarding Emails"])
      end
    end

    describe "subscribe to the thing already subscribed to" do
      let(:subscription) { "Status Surveys" }

      it "does not change subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(nil)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails"])
      end
    end

    describe "unsubscribe" do
      let(:subscription) { "Status Surveys" }
      let(:action) { "unsubscribe" }

      it "updates subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(account.id)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails", "Status Surveys"])
      end
    end

    describe "unsubscribe from the thing already unsubscribed from" do
      let(:action) { "unsubscribe" }

      it "does not change subscriptions" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account.log_data.responsible_id).to eq(nil)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails"])
      end
    end
  end

  context "when impersonating" do
    let(:current_user) { create(:user, account:) }
    let(:admin) { create(:account, :admin) }
    let(:context) { {current_user:, current_account: admin} }

    describe "subscribe" do
      it "updates subscriptions of the user" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account).to eq(current_user.account)
        expect(account.log_data.responsible_id).to eq(admin.id)
        expect(account.unsubscribed_from).to match_array(["Onboarding Emails"])
      end
    end

    describe "subscribe to the thing already subscribed to" do
      let(:subscription) { "Status Surveys" }

      it "does not change subscriptions of the user" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account).to eq(current_user.account)
        expect(account.log_data.responsible_id).to eq(nil)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails"])
      end
    end

    describe "unsubscribe" do
      let(:subscription) { "Status Surveys" }
      let(:action) { "unsubscribe" }

      it "updates subscriptions of the user" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account).to eq(current_user.account)
        expect(account.log_data.responsible_id).to eq(admin.id)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails", "Status Surveys"])
      end
    end

    describe "unsubscribe from the thing already unsubscribed from" do
      let(:action) { "unsubscribe" }

      it "does not change subscriptions of the user" do
        response = AdvisableSchema.execute(query, context:)
        id = response.dig("data", "manageSubscription", "account", "id")
        account = Account.with_log_data.find_by!(uid: id)
        expect(account).to eq(current_user.account)
        expect(account.log_data.responsible_id).to eq(nil)
        expect(account.unsubscribed_from).to match_array(["SMS Alerts", "Onboarding Emails"])
      end
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
