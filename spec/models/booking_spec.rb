require 'rails_helper'

RSpec.describe Booking, type: :model do
  include_examples "airtable syncing"
  it { should belong_to(:application) }

  it 'has a valid factory' do
    booking = build(:booking)
    expect(booking).to be_valid
  end
  
  context "when state is Proposed" do
    it 'is invalid if there is already a proposal for that applicant' do
      application = create(:application)
      create(:booking, status: 'Proposed', application: application)
      booking = build(:booking, status: 'Proposed', application: application)
      expect(booking).to_not be_valid
      expect(booking.errors[:application]).to include(
        'This application already has a proposal'
      )
    end
  end
end
