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
        url = "https://api.openai.com/v1/engines/text-search-babbage-doc-001/embeddings"
        stub_request(:post, url).to_return(body: {data: [{embedding: [-0.024432803, 0.02814213, 0.02230821]}]}.to_json, headers: {content_type: "application/json"})

        embedding = described_class.for_article(article)

        expect(WebMock).to have_requested(:post, url).with(body: {input: article_text})
        expect(embedding).to be_persisted
        expect(embedding.id).not_to be_nil
        expect(embedding.article).to eq(article)
        expect(embedding.vector).to eq(Vector[-0.024432803, 0.02814213, 0.02230821])

        stub_request(:post, url).to_return(body: {data: [{embedding: [-0.03375003, -0.04129375, -0.0095707765]}]}.to_json, headers: {content_type: "application/json"})
        new_embedding = described_class.for_article(article)
        expect(new_embedding.data).to eq(embedding.data)
        expect(new_embedding.vector).to eq(Vector[-0.024432803, 0.02814213, 0.02230821])
      end

      it "resends it if refresh is true" do
        url = "https://api.openai.com/v1/engines/text-search-babbage-doc-001/embeddings"
        stub_request(:post, url).to_return(body: {data: [{embedding: [-0.024432803, 0.02814213, 0.02230821]}]}.to_json, headers: {content_type: "application/json"})

        embedding = described_class.for_article(article)

        expect(WebMock).to have_requested(:post, url).with(body: {input: article_text})
        expect(embedding).to be_persisted
        expect(embedding.id).not_to be_nil
        expect(embedding.article).to eq(article)
        expect(embedding.vector).to eq(Vector[-0.024432803, 0.02814213, 0.02230821])

        stub_request(:post, url).to_return(body: {data: [{embedding: [-0.03375003, -0.04129375, -0.0095707765]}]}.to_json, headers: {content_type: "application/json"})
        new_embedding = described_class.for_article(article, refresh: true)
        expect(new_embedding.data).not_to eq(embedding.data)
        expect(new_embedding.vector).to eq(Vector[-0.03375003, -0.04129375, -0.0095707765])
      end
    end
  end
end
