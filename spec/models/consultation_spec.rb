require 'rails_helper'

RSpec.describe Consultation, type: :model do
  it "has a valid factory" do
    record = build(:consultation)
    expect(record).to be_valid
  end
end
