# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateAccount do
  let(:context) { {current_user:, current_account: current_user&.account} }

  let(:query) do
    <<-GRAPHQL
      mutation UpdateAccount($input: UpdateAccountInput!) {
        updateAccount(input: $input) {
          account {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:request) do
    AdvisableSchema.execute(query, context:, variables: {input:})
  end

  context "when updating avatar" do
    let(:file) { Rails.root.join("spec/support/test.pdf") }
    let(:signed_id) { ActiveStorage::Blob.create_and_upload!(io: File.open(file), filename: "test.pdf").signed_id }
    let(:input) { {avatar: signed_id} }

    context "when the current user is a user" do
      let(:current_user) { create(:user) }

      it "updates the avatar" do
        id = request["data"]["updateAccount"]["account"]["id"]
        expect(id).to eq(current_user.account.uid)
        expect(current_user.account.avatar.blob.signed_id).to eq(signed_id)
      end
    end

    context "when the current user is a specialist" do
      let(:current_user) { create(:specialist) }

      it "updates the avatar" do
        id = request["data"]["updateAccount"]["account"]["id"]
        expect(id).to eq(current_user.account.uid)
        expect(current_user.account.avatar.blob.signed_id).to eq(signed_id)
      end
    end

    context "when no user is logged in" do
      let(:current_user) { nil }

      it "returns an error" do
        error = request["errors"][0]["extensions"]["code"]
        expect(error).to eq("NOT_AUTHENTICATED")
      end
    end
  end

  context "when updating first_name, last_name, email and timezone" do
    let(:input) do
      {
        firstName: "Updated",
        lastName: "Changed",
        email: "changed@test.com",
        timezone: "Asia/Dubai"
      }
    end

    context "when the current user is a user" do
      let(:current_user) { create(:user) }

      it "updates the values" do
        expect(current_user.account.first_name).not_to eq("Updated")
        expect(current_user.account.last_name).not_to eq("Changed")
        expect(current_user.account.email).not_to eq("changed@test.com")
        expect(current_user.account.timezone).not_to eq("Asia/Dubai")
        request
        expect(current_user.account.first_name).to eq("Updated")
        expect(current_user.account.last_name).to eq("Changed")
        expect(current_user.account.email).to eq("changed@test.com")
        expect(current_user.account.timezone).to eq("Asia/Dubai")
      end
    end

    context "when the current user is a specialist" do
      let(:current_user) { create(:specialist) }

      it "updates the values" do
        expect(current_user.account.first_name).not_to eq("Updated")
        expect(current_user.account.last_name).not_to eq("Changed")
        expect(current_user.account.email).not_to eq("changed@test.com")
        expect(current_user.account.timezone).not_to eq("Asia/Dubai")
        request
        expect(current_user.account.first_name).to eq("Updated")
        expect(current_user.account.last_name).to eq("Changed")
        expect(current_user.account.email).to eq("changed@test.com")
        expect(current_user.account.timezone).to eq("Asia/Dubai")
      end
    end
  end

  context "when providing an invalid value" do
    let(:current_user) { create(:user) }
    let(:input) { {email: "invalid_email"} }

    it "returns error with code FAILED_TO_UPDATE" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("FAILED_TO_UPDATE")
    end
  end
end
