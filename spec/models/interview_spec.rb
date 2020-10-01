require 'rails_helper'

RSpec.describe Interview, type: :model do
  include_examples 'Airtable::Syncable'

  it "has a valid factory" do
    interview = build(:interview)
    expect(interview).to be_valid
  end
end
