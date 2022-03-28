# frozen_string_literal: true

require "matrix"

module CaseStudy
  class Embedding < ApplicationRecord
    belongs_to :article

    def self.for_article(article, refresh: false)
      embedding = find_or_initialize_by(article:)
      return embedding if embedding.persisted? && !refresh

      embedding.data = OpenAiInteractor.new.document_embedding_for(article.text_for_embedding)
      embedding.save!
      embedding
    end

    def self.ordered_articles_for(vector)
      results = []
      joins(:article).merge(Article.searchable).find_each do |embedding|
        results << {
          similarity: embedding.cosine_similarity_to(vector),
          article_id: embedding.article_id
        }
      end
      results.sort_by { |r| r[:similarity] }
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
