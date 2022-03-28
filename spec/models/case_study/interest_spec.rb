# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Interest, type: :model do
  let(:interest) { create(:case_study_interest) }

  it "has a valid factory" do
    expect(build(:case_study_interest)).to be_valid
  end

  it "persists term_data" do
    allow_any_instance_of(OpenAiInteractor).to receive(:embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821])

    expect(interest.term_data).to be_blank
    interest.term_vector
    expect(interest.term_data).to eq([-0.024432803, 0.02814213, 0.02230821])
  end
end
