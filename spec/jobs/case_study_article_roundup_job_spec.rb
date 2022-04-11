# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudyArticleRoundupJob do
  let(:user) { create(:user) }
  let!(:interest) { create(:case_study_interest, account: user.account) }

  it "sends email" do
    described_class.perform_now
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", {args: [user, []]}).once
  end

  context "when unsubscribed" do
    before do
      interest.account.update!(unsubscribed_from: ["Case Study Article Roundup"])
    end

    it "does not send email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "case_study_article_roundup", "deliver_now", any_args)
    end
  end
end
