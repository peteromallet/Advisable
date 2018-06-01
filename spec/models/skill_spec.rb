require 'rails_helper'

describe Skill do
  include_examples "airtable syncing"
  it { should have_many(:specialists).through(:specialist_skills) }
  it { should validate_presence_of(:name) }
end
