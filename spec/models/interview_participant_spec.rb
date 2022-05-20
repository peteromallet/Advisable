# frozen_string_literal: true

require "rails_helper"

RSpec.describe InterviewParticipant, type: :model do
  it "has a valid factory" do
    expect(build(:interview_participant)).to be_valid
  end
end
