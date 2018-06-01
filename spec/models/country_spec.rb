require 'rails_helper'

describe Country do
  include_examples "airtable syncing"
  it { should have_many(:specialists) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:currency) }
end
