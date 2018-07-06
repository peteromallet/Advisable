require 'rails_helper'

RSpec.describe Booking, type: :model do
  include_examples "airtable syncing"
  it { should belong_to(:application) }

  it "sets the status to 'Offered' after_initialize" do
    b = Booking.new(status: nil)
    expect(b.status).to eq('Offered')
  end
end
