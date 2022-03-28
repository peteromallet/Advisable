# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Embedding, type: :model do
  let(:embedding) { build(:case_study_embedding) }

  it "has a valid factory" do
    expect(embedding).to be_valid
  end

  describe ".for_article" do
    let(:article) { create(:case_study_article) }
    let(:article_text) { article.to_text.tr("\n", " ").split.first(1500).join(" ") }

    context "when the embedding already exists" do
      let!(:embedding) { create(:case_study_embedding, article:) }

      it "returns an embedding for the article" do
        expect(described_class.for_article(article)).to eq(embedding)
      end
    end

    context "when the embedding does not exist" do
      it "creates an embedding for the article" do
        allow_any_instance_of(OpenAiInteractor).to receive(:embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821])
        embedding = described_class.for_article(article)

        expect(embedding).to be_persisted
        expect(embedding.id).not_to be_nil
        expect(embedding.article).to eq(article)
        expect(embedding.vector).to eq(Vector[-0.024432803, 0.02814213, 0.02230821])

        allow_any_instance_of(OpenAiInteractor).to receive(:embedding_for).and_return([-0.03375003, -0.04129375, -0.0095707765])
        new_embedding = described_class.for_article(article)
        expect(new_embedding.data).to eq(embedding.data)
        expect(new_embedding.vector).to eq(Vector[-0.024432803, 0.02814213, 0.02230821])
      end

      it "resends it if refresh is true" do
        allow_any_instance_of(OpenAiInteractor).to receive(:embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821])
        embedding = described_class.for_article(article)

        expect(embedding).to be_persisted
        expect(embedding.id).not_to be_nil
        expect(embedding.article).to eq(article)
        expect(embedding.vector).to eq(Vector[-0.024432803, 0.02814213, 0.02230821])

        allow_any_instance_of(OpenAiInteractor).to receive(:embedding_for).and_return([-0.03375003, -0.04129375, -0.0095707765])
        new_embedding = described_class.for_article(article, refresh: true)
        expect(new_embedding.data).not_to eq(embedding.data)
        expect(new_embedding.vector).to eq(Vector[-0.03375003, -0.04129375, -0.0095707765])
      end
    end
  end
end
