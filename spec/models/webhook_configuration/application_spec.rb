require "rails_helper"

RSpec.describe WebhookConfiguration::Application do
  describe "#data" do
    let(:application) { create(:application) }

    it "outputs the attributes hash for a given application" do
      config = WebhookConfiguration::Application.new
      expect(config.data(application)).to eq({
        project_id: application.project.airtable_id,
        application_id: application.airtable_id,
        specialist_id: application.specialist.airtable_id,
        reason: application.rejection_reason.try(:reason)
      })
    end
  end
end