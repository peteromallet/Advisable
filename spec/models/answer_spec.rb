require "rails_helper"

RSpec.describe Answer, type: :model do
  let(:answer) { build_stubbed(:answer) }

  it "has an answer to a question" do
    expect(answer.question.content).to eq "What kind of bear is best?"
    expect(answer.content).to eq "Black bear."
  end
end
