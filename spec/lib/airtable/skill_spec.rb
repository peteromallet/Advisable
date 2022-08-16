# frozen_string_literal: true

require "rails_helper"

RSpec.describe Airtable::Skill do
  # We can declare a fields let variable which the shared examples below will
  # use as the airtable fields.
  let(:fields) do
    {
      "Name" => "Testing",
      "Category" => ["Testing"]
    }
  end

  include_examples "airtable syncing"
  include_examples "sync airtable column", "Name", to: :name

  it "syncs the category" do
    record = create(:skill, category: nil)
    airtable = described_class.new(fields, id: record.airtable_id)
    expect { airtable.sync }.to change { record.reload.category }.
      from(nil).to("Testing")
  end

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
