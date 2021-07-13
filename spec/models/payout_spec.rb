# frozen_string_literal: true

require "rails_helper"

RSpec.describe Payout, type: :model do
  it "has a valid factory" do
    expect(build(:payout)).to be_valid
  end
end
