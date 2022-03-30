# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Interest, type: :model do
  let(:interest) { create(:case_study_interest) }

  it "has a valid factory" do
    expect(build(:case_study_interest)).to be_valid
  end

  it "persists term_data" do
    allow_any_instance_of(OpenAiInteractor).to receive(:query_embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821])

    expect(interest.term_data).to be_blank
    interest.term_vector
    expect(interest.term_data).to eq([-0.024432803, 0.02814213, 0.02230821])
  end

  context "when target audience is populated" do
    let(:company) { create(:company, target_audience: "Hipsters") }
    let(:user) { create(:user, company:) }
    let(:interest) { create(:case_study_interest, account: user.account, term: "funny B2B content") }

    it "adds it to term" do
      expect(interest.term_data).to be_blank
      expect_any_instance_of(OpenAiInteractor).to receive(:query_embedding_for).with("funny B2B content for Hipsters")
      interest.term_vector
    end
  end
end
