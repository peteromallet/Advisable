# frozen_string_literal: true

require "rails_helper"

RSpec.describe Conversation, type: :model do
  it "has a valid factory" do
    expect(build(:conversation)).to be_valid
  end
end
