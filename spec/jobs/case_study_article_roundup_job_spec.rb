# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudyArticleRoundupJob do
  let(:user) { create(:user) }
  let!(:interest) { create(:case_study_interest, account: user.account) }
  let(:article1) { create(:case_study_article, score: 99) }
  let(:article2) { create(:case_study_article, score: 99) }
  let(:article3) { create(:case_study_article, score: 99) }

  context "when happy path" do
    before { 3.times { |i| create(:case_study_interest_article, interest:, article: public_send("article#{i + 1}")) } }

    it "sends email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", {args: [user, match_array([article1.id, article2.id, article3.id])]}).once
    end
  end

  context "when not enough articles have high scores" do
    let(:article1) { create(:case_study_article, score: 50) }

    before { 3.times { |i| create(:case_study_interest_article, interest:, article: public_send("article#{i + 1}")) } }

    it "does not send email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", any_args)
    end
  end

  context "when less than 3 articles" do
    before { 2.times { |i| create(:case_study_interest_article, interest:, article: public_send("article#{i + 1}")) } }

    it "does not send email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", any_args)
    end
  end

  context "when articles were already showcased" do
    let(:article4) { create(:case_study_article, score: 99) }
    let(:article5) { create(:case_study_article, score: 99) }
    let(:article6) { create(:case_study_article, score: 99) }

    before { 6.times { |i| create(:case_study_interest_article, interest:, article: public_send("article#{i + 1}")) } }

    it "sends email with the new ones" do
      user.account.update!(showcased_articles: [article1.id, article2.id, article3.id])
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", {args: [user, match_array([article4.id, article5.id, article6.id])]}).once
    end
  end

  context "when unsubscribed" do
    before do
      interest.account.update!(unsubscribed_from: ["Weekly Digest"])
    end

    it "does not send email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", any_args)
    end
  end
end
