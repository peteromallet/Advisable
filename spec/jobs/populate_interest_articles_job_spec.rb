# frozen_string_literal: true

require "rails_helper"

RSpec.describe PopulateInterestArticlesJob do
  let(:interest) { create(:case_study_interest) }
  let(:embedding1) { create(:case_study_embedding) }
  let(:embedding2) { create(:case_study_embedding) }
  let!(:article1) { embedding1.article }
  let!(:article2) { embedding2.article }

  before { allow_any_instance_of(OpenAiInteractor).to receive(:query_embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821]) }

  it "populates articles" do
    expect(interest.interest_articles).to be_blank
    described_class.perform_now(interest)
    expect(interest.articles).to match_array([article1, article2])
  end
end
