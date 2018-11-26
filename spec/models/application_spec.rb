require 'rails_helper'

describe Application do
  it { should belong_to(:project) }
  it { should belong_to(:specialist) }

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
