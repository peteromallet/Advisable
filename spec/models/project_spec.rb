require 'rails_helper'

describe Project do
  include_examples "Airtable::Syncable"
  it { should validate_presence_of(:name) }
  it { should have_many(:applications) }
end
