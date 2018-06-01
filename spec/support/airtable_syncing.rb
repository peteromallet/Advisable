RSpec.shared_examples "airtable syncing" do
  it { should validate_presence_of(:airtable_id) }
end
