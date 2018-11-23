require 'rails_helper'

RSpec.describe ApplicationRejectionReason, type: :model do
  it { should have_many(:applications) }
  it { should validate_presence_of(:reason) }
end
