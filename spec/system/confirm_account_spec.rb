# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Confirming an account", type: :system do
  context "with a user" do
    it "displays the account confirmed notification" do
      user = create(:user, account: create(:account, confirmed_at: nil))
      allow(Token).to receive(:new).and_return("test_token")
      user.send_confirmation_email
      visit "/confirm_account/test_token?email=#{user.account.email}"
      expect(page).to have_content("Your account has been confirmed")
    end

    context "when given an invalid token" do
      it "displays the failed confirmation notification" do
        specialist = create(:user, account: create(:account, confirmed_at: nil))
        specialist.send_confirmation_email
        visit "/confirm_account/test_token?email=#{specialist.account.email}"
        expect(page).to have_content("Failed to confirm your account")
      end
    end
  end

  context "when specialist" do
    it "displays the account confirmed notification" do
      specialist = create(:specialist, account: create(:account, confirmed_at: nil))
      allow(Token).to receive(:new).and_return("test_token")
      specialist.send_confirmation_email
      visit "/confirm_account/test_token?email=#{specialist.account.email}"
      expect(page).to have_content("Your account has been confirmed")
    end
  end
end
