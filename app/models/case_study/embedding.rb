# frozen_string_literal: true

require "matrix"

module CaseStudy
  class Embedding < ApplicationRecord
    ENGINE = "babbage"

    belongs_to :article

    def self.for_article(article, refresh: false)
      embedding = find_or_initialize_by(article:)
      return embedding if embedding.persisted? && !refresh

      text = article.to_text.tr("\n", " ").split.first(1500).join(" ")
      response = OpenAI::Client.new.embeddings(
        engine: "text-search-#{ENGINE}-doc-001",
        parameters: {input: text}
      )
      embedding.data = response["data"].first["embedding"]
      embedding.save!
      embedding
    end

    def vector
      Vector.elements(data)
    end

    def cosine_similarity_to(other_vector)
      vector.dot(other_vector) / (vector.magnitude * other_vector.magnitude)
    end
  end
end

# == Schema Information
#
# Table name: case_study_embeddings
#
#  id         :bigint           not null, primary key
#  data       :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#
# Indexes
#
#  index_case_study_embeddings_on_article_id  (article_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#
