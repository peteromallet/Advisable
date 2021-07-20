# frozen_string_literal: true

require "rails_helper"

RSpec.describe Message, type: :model do
  it "has a valid factory" do
    expect(build(:message)).to be_valid
  end
end
