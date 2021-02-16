# frozen_string_literal: true

require "rails_helper"

RSpec.describe WebhookConfiguration::Interview do
  describe "#data" do
    let(:interview) { create(:interview) }

    it "outputs the attributes hash for a given interview" do
      config = described_class.new
      expect(config.data(interview)).to eq(
        {
          id: interview.uid,
          starts_at: interview.starts_at,
          status: interview.status,
          time_zone: interview.time_zone,
          application: {
            id: interview.application.uid
          }
        }
      )
    end
  end
end
