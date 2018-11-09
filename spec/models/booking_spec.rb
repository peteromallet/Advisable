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

  describe "#calculate_end_date" do
    let(:booking){ build(:booking, type: "Recurring", start_date: DateTime.now, end_date: nil) }

    context "when the duration is a number of months" do
      it "sets the end_date to the start_date + number of months" do
        booking.duration = "3 Months"
        expect { booking.calculate_end_date }.to change { booking.end_date }.from(nil).to(booking.start_date >> 3)
      end
    end

    context "when the duration is 'Until Cancellation'" do
      it 'sets the end_date to nil' do
        booking.duration = 'Until Cancellation'
        expect { booking.calculate_end_date }.to_not change { booking.end_date }
      end
    end
  end
end
