require 'rails_helper'

RSpec.describe Interview, type: :model do
  it "has a valid factory" do
    interview = build(:interview)
    expect(interview).to be_valid
  end

  it "is invalid if starts_at is not an available time" do
    interview = build(:interview)
    interview.starts_at = 10.days.from_now
    expect(interview).to_not be_valid
    expect(interview.errors[:starts_at][0]).to match(/not available/)
  end
end
