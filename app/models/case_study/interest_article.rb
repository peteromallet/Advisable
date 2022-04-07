# frozen_string_literal: true

module CaseStudy
  class InterestArticle < ApplicationRecord
    belongs_to :interest
    belongs_to :article

    validates :article_id, uniqueness: {scope: :interest_id}

    scope :by_similarity, -> { order("similarity DESC NULLS LAST") }
    scope :distinct_articles, -> { select("DISTINCT ON (article_id) article_id, id").order(:article_id) }
  end
end

# == Schema Information
#
# Table name: case_study_interest_articles
#
#  id          :bigint           not null, primary key
#  similarity  :decimal(, )
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  article_id  :bigint           not null
#  interest_id :bigint           not null
#
# Indexes
#
#  index_case_study_interest_articles_on_article_id       (article_id)
#  index_case_study_interest_articles_on_interest_id      (interest_id)
#  index_interest_articles_on_interest_id_and_article_id  (interest_id,article_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (interest_id => case_study_interests.id)
#
