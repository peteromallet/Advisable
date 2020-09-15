require "rails_helper"

RSpec.describe WebhookConfiguration::Interview do
  describe "#data" do
    let(:interview) { create(:interview) }

    it "outputs the attributes hash for a given interview" do
      config = WebhookConfiguration::Interview.new
      expect(config.data(interview)).to eq({
        id: interview.id,
        airtable_id: interview.airtable_id,
        starts_at: interview.starts_at,
        status: interview.status,
        time_zone: interview.time_zone,
        application: {
          id: interview.application.id,
          airtable_id: interview.application.airtable_id
        },
      })
    end
  end
end