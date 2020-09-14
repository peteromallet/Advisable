require 'rails_helper'

describe Specialist do
  include_examples "uid"

  it { should have_many(:applications) }
  it { should have_many(:skills).through(:specialist_skills) }

  describe "#name" do
    it "outputs the full name" do
      specialist = Specialist.new(first_name: "Tom", last_name: "Cullen")
      expect(specialist.name).to eq("Tom Cullen")
    end
  end

  describe "#has_setup_payments" do
    it 'returns false if there is no bank_holder_name' do
      specialist = build(:specialist, bank_holder_name: nil)
      expect(specialist.has_setup_payments).to be_falsey
    end

    it 'returns false if there is no bank_holder_address' do
      specialist = build(:specialist, bank_holder_address: nil)
      expect(specialist.has_setup_payments).to be_falsey
    end

    it 'returns false if there is no bank_currency' do
      specialist = build(:specialist, bank_currency: nil)
      expect(specialist.has_setup_payments).to be_falsey
    end

    it 'returns true if they have provided all payment info' do
      specialist = build(:specialist, {
        bank_currency: "EUR",
        bank_holder_name: "Test Account",
        bank_holder_address: {
          "line1" => "line1",
          "line2" => "line2",
          "city" => "city",
          "state" => "state",
          "country" => "country",
          "postcode" => "postcode",
        }
      })
      expect(specialist.has_setup_payments).to be_truthy
    end
  end
end
