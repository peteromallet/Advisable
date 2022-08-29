# frozen_string_literal: true

require "rails_helper"

RSpec.describe Airtable::Skill do
  include_examples "airtable syncing"

  describe "self.active" do
    it "fetches all of the skills from the 'Skelectable Skills' view" do
      skill = described_class.new({"Name" => "Test"}, id: "rec_123")
      expect(described_class).to receive(:all).with(
        view: "Selectable Skills",
        sort: {"Name" => "asc"}
      ).and_return([skill])

      described_class.active
    end
  end

  describe "self.find_by_name" do
    it "finds a skill by its name" do
      results = double("airtable results")
      expect(results).to receive(:first)
      expect(described_class).to receive(:all).with(
        filter: "{Name} = 'Test'"
      ).and_return(results)
      described_class.find_by_name("Test")
    end
  end
end
