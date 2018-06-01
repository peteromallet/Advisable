require 'rails_helper'

RSpec.describe RejectedReason, type: :model do
  include_examples "airtable syncing"
  it { should have_many(:applications) }
  it { should validate_presence_of(:reason) }
end
