require 'rails_helper'

RSpec.describe BookingRejectionReason, type: :model do
  it { should have_many(:bookings) }
  it { should validate_presence_of(:name) }
end
