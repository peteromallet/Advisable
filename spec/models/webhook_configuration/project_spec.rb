require "rails_helper"

RSpec.describe WebhookConfiguration::Project do
  describe "#data" do
    let(:project) { create(:project) }

    it "outputs the attributes hash for a given project" do
      config = WebhookConfiguration::Project.new
      expect(config.data(project)).to eq(project.attributes.except("client_id", "created_at", "updated_at"))
    end
  end
end