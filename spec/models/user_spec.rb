require 'rails_helper'

RSpec.describe User, type: :model do
  include_examples "account"

  it "has a valid factory" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "removes any availability in the past before saving" do
    user = create(:user)
    a = 1.day.ago.change({ hour: 10, min: 0, sec: 0 })
    b = 1.day.from_now.change({ hour: 10, min: 0, sec: 0 })
    user.availability = [a, b]
    expect(user.availability).to include(a)
    user.save
    expect(user.availability).to_not include(a)
    expect(user.availability).to include(b)
  end
end
