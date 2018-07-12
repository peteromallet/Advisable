require 'rails_helper'

RSpec.describe BookingRejectionReason, type: :model do
  include_examples "airtable syncing"
  it { should have_many(:bookings) }
  it { should validate_presence_of(:name) }
end
