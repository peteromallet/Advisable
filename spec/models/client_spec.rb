require 'rails_helper'

RSpec.describe Client, type: :model do
  it "has a valid factory" do
    client = build(:client)
    expect(client).to be_valid
  end

  it "removes any availability in the past before saving" do
    client = create(:client)
    a = 1.day.ago.change({ hour: 10, min: 0, sec: 0 })
    b = 1.day.from_now.change({ hour: 10, min: 0, sec: 0 })
    client.availability = [a, b]
    expect(client.availability).to include(a)
    client.save
    expect(client.availability).to_not include(a)
    expect(client.availability).to include(b)
  end
end
