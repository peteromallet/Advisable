# frozen_string_literal: true

require "rails_helper"

RSpec.describe UserMailer do
  describe "#confirm" do
    let(:token) { Token.new }
    let(:user) { create(:user, account: create(:account, confirmation_digest: Token.digest(token))) }
    let(:mail) { described_class.confirm(uid: user.uid, token: token) }

    it "renders correct headers" do
      expect(mail.to).to eq([user.account.email])
      expect(mail.subject).to eq("Account Confirmation")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("confirm your email")
    end
  end

  describe "#case_study_searches_refreshed" do
    let(:user) { create(:user) }
    let(:search1) { create(:case_study_search) }
    let(:search2) { create(:case_study_search) }
    let(:article1) { create(:case_study_article) }
    let(:article2) { create(:case_study_article) }
    let(:article3) { create(:case_study_article) }
    let(:mail) { described_class.case_study_searches_refreshed(user, {search1.id => [article1.id], search2.id => [article2.id, article3.id]}) }

    it "renders correct headers" do
      expect(mail.to).to eq([user.account.email])
      expect(mail.subject).to eq("You Have New Recommendations")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to include(article1.uid).
        and(include(article2.uid).
        and(include(article3.uid)))
    end
  end
end
