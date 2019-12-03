require 'rails_helper'

describe Consultation, type: :model do
  it "has a valid factory" do
    record = build(:consultation)
    expect(record).to be_valid
  end
end
