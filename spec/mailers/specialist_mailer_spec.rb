# frozen_string_literal: true

require "rails_helper"

RSpec.describe SpecialistMailer do
  describe "#inform_about_project" do
    let(:account) { create(:account) }
    let(:specialist) { create(:specialist, account:) }
    let(:project) { create(:project) }

    it "sends to right address" do
      mail = described_class.inform_about_project(project.id, specialist.id)
      expect(mail.to).to eq([specialist.account.email])
    end

    context "when unsubscribed" do
      let(:account) { create(:account, unsubscribed_from: ["Automated Invitations"]) }

      it "does not send the email" do
        mail = described_class.inform_about_project(project.id, specialist.id)
        expect(mail.to).to eq(nil)
      end
    end
  end
end
