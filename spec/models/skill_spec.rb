require 'rails_helper'

RSpec.describe Skill do
  it { should have_many(:specialists).through(:specialist_skills) }
  it { should validate_presence_of(:name) }
end
