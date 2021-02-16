# frozen_string_literal: true

require "rails_helper"

RSpec.describe WebhookConfiguration::Application do
  describe "#data" do
    let(:application) { create(:application) }

    it "outputs the attributes hash for a given application" do
      config = described_class.new
      expect(config.data(application)).to eq(
        {
          project_id: application.project.uid,
          application_id: application.uid,
          specialist_id: application.specialist.uid,
          reason: application.rejection_reason.try(:reason)
        }
      )
    end
  end
end
