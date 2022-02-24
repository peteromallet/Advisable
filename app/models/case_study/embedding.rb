# frozen_string_literal: true

require "matrix"

module CaseStudy
  class Embedding < ApplicationRecord
    ENGINES = %w[babbage davinci].freeze

    belongs_to :article

    validates :engine, inclusion: {in: ENGINES}

    ENGINES.each { |engine| scope engine, -> { where(engine:) } }

    def vector
      Vector.elements(embedding)
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
#  embedding  :jsonb
#  engine     :string
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
