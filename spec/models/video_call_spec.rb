require 'rails_helper'

RSpec.describe VideoCall, type: :model do
  it "has a valid factory" do
    video_call = build(:video_call)
    expect(video_call).to be_valid
  end
end
