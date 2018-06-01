require 'rails_helper'

describe Specialist do
  include_examples "airtable syncing"
  it { should have_many(:applications) }
  it { should have_many(:skills).through(:specialist_skills) }
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:city) }

  describe "#name" do
      it "outputs the full name" do
        specialist = Specialist.new(first_name: "Tom", last_name: "Cullen")
        expect(specialist.name).to eq("Tom Cullen")
      end
  end
end
