# frozen_string_literal: true

require "rails_helper"

RSpec.describe ConversationParticipant, type: :model do
  it "has a valid factory" do
    expect(build(:conversation_participant)).to be_valid
  end
end
