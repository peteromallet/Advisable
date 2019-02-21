require 'rails_helper'

describe Specialist do
  it { should have_many(:applications) }
  it { should have_many(:skills).through(:specialist_skills) }

  describe "#name" do
      it "outputs the full name" do
        specialist = Specialist.new(first_name: "Tom", last_name: "Cullen")
        expect(specialist.name).to eq("Tom Cullen")
      end
  end
end
