require 'rails_helper'

RSpec.describe ApplicationReference, type: :model do
  it 'has a valid factory' do
    ref = build(:application_reference)
    expect(ref).to be_valid
  end
end
