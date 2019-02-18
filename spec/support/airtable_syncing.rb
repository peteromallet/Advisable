RSpec.shared_examples "airtable syncing" do
  it "has a table_name" do
    expect(described_class.table_name).to_not be_nil
  end

  it "has a sync_model" do
    expect(described_class.sync_model).to be < ActiveRecord::Base
  end
end