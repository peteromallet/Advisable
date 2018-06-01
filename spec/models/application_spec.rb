require 'rails_helper'

describe Application do
  include_examples "airtable syncing"
  it { should belong_to(:project) }
  it { should belong_to(:specialist) }
  it { should validate_presence_of(:rate) }

  describe "#questions" do
    context "when nil" do
      it "returns an empty array" do
        application = Application.new
        application.questions = nil
        expect(application.questions).to eq([])
      end
    end
  end
end
