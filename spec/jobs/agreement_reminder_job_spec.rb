# frozen_string_literal: true

require "rails_helper"

RSpec.describe AgreementReminderJob do
  let(:created_at) { 4.days.ago }
  let(:reminded_at) { nil }
  let!(:agreement) { create(:agreement, created_at:, reminded_at:) }

  it "sends reminder only once" do
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "agreement_reminder", "deliver_now", {args: [agreement]}).once
  end

  context "when not yet remindeable" do
    let(:created_at) { 2.days.ago }

    it "does not send reminder" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "agreement_reminder", "deliver_now", {args: [agreement]}).once
    end
  end

  context "when already reminded" do
    let(:reminded_at) { 1.day.ago }

    it "does not send reminder" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "agreement_reminder", "deliver_now", {args: [agreement]}).once
    end
  end
end
