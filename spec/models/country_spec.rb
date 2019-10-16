require 'rails_helper'

describe Country do
  it { should have_many(:specialists) }
  it { should validate_presence_of(:name) }
end
