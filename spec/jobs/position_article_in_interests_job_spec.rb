# frozen_string_literal: true

require "rails_helper"

RSpec.describe PositionArticleInInterestsJob do
  let(:article) { create(:case_study_article) }
  let(:embedding) { create(:case_study_embedding, article:, data: [0.003743529, 0.9055626356, 0.919196358]) }
  let(:interest) { create(:case_study_interest, treshold: 0.8, term_data: [0.003743529, 0.0055626356, 0.019196358]) }
  let!(:interest_article) { create(:case_study_interest_article, interest:, article:, similarity: 0.865) }

  before { allow_any_instance_of(OpenAiInteractor).to receive(:document_embedding_for).and_return([0.024432803, 0.02814213, 0.02230821]) }

  it "recalculates interest article score" do
    data = embedding.data
    described_class.perform_now(article)
    expect(embedding.reload.data).not_to eq(data)
    expect(interest_article.reload.similarity.round(3)).to eq(0.766)
  end

  context "when other interests are found relevant" do
    let!(:another_interest) { create(:case_study_interest, treshold: 0.5, term_data: [0.1, 0.2, 0.3]) }

    it "adds article to interest articles" do
      expect(another_interest.articles).to be_empty
      described_class.perform_now(article)
      expect(another_interest.articles).to eq([article])
      ia = CaseStudy::InterestArticle.find_by(interest: another_interest, article:)
      expect(ia.similarity.round(3)).to eq(0.908)
    end
  end

  context "when other interests are not found relevant" do
    let!(:another_interest) { create(:case_study_interest, treshold: 0.99, term_data: [0.1, 0.2, 0.3]) }

    it "adds article to interest articles" do
      expect(another_interest.articles).to be_empty
      described_class.perform_now(article)
      expect(another_interest.articles).to be_empty
    end
  end
end
