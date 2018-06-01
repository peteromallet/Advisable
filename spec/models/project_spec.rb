require 'rails_helper'

describe Project do
  include_examples "airtable syncing"
  it { should validate_presence_of(:name) }
  it { should have_many(:applications) }
end
