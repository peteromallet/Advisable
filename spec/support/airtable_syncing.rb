# frozen_string_literal: true

RSpec.shared_examples("airtable syncing") do |_config = {}|
  let(:factory) { described_class.sync_model.to_s.underscore }

  it "has a table_name" do
    expect(described_class.table_name).not_to be_nil
  end

  it "has a sync_model" do
    expect(described_class.sync_model).to be < ActiveRecord::Base
  end

  describe "self.base_key" do
    it "returns the AIRTABLE_DATABASE_KEY" do
      expect(described_class.base_key).to eq(ENV.fetch("AIRTABLE_DATABASE_KEY", nil))
    end
  end

  describe "#model" do
    it "returns the active record model with matching airtable id" do
      active_record_model = create(factory)
      record = described_class.new({}, id: active_record_model.airtable_id)
      expect(record.model).to eq(active_record_model)
    end
  end
end
