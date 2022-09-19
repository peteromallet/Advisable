# frozen_string_literal: true

require "rails_helper"

RSpec.describe AccountMailer do
  describe "#reset_password" do
    let(:token) { Token.new }
    let(:account) { create(:account, reset_digest: Token.digest(token), reset_sent_at: Time.zone.now) }
    let(:mail) { described_class.reset_password(id: account.id, token:) }

    it "renders correct headers" do
      expect(mail.to).to eq([account.email])
      expect(mail.subject).to eq("Reset password")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("reset your password")
    end
  end

  describe "#interview_request_reminder" do
    let(:interview) { create(:interview, :with_specialist_and_user) }
    let(:sales_person) { create(:sales_person) }
    let(:mail) { described_class.interview_request_reminder(interview) }

    before do
      interview.user.company.update(sales_person:)
      interview.conversation.new_message!(author: interview.user.account, kind: "InterviewRequest", interview: interview, send_emails: false)
    end

    context "when requested by user" do
      before { interview.update!(requested_by: interview.user.account) }

      it "sends email to specialist" do
        expect(mail.to).to eq([interview.specialist.account.email])
        expect(mail.subject).to eq("Reminder for consultation request from #{interview.user.account.name_with_company}")
        expect(mail.from).to eq([interview.user.company.sales_person.email])
        body = mail.body.encoded
        expect(body).to match("Hi #{interview.specialist.account.first_name},")
        expect(body).to match("#{interview.user.account.name_with_company} left the following message")
      end
    end

    context "when requested by specialist" do
      before { interview.update!(requested_by: interview.specialist.account) }

      it "sends email to user" do
        expect(mail.to).to eq([interview.user.account.email])
        expect(mail.subject).to eq("Reminder for consultation request from #{interview.specialist.account.name}")
        expect(mail.from).to eq([interview.user.company.sales_person.email])
        body = mail.body.encoded
        expect(body).to match("Hi #{interview.user.account.first_name},")
        expect(body).to match("#{interview.specialist.account.name} left the following message")
      end
    end
  end
end
