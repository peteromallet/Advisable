require 'rails_helper'

RSpec.describe Booking, type: :model do
  include_examples "airtable syncing"
  it { should belong_to(:application) }
end
