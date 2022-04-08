# frozen_string_literal: true

module CaseStudy
  class FavoritedArticle < ApplicationRecord
    belongs_to :account
    belongs_to :article

    validates :article_id, uniqueness: {scope: :account_id}
  end
end

# == Schema Information
#
# Table name: case_study_favorited_articles
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint           not null
#  article_id :bigint           not null
#
# Indexes
#
#  index_case_study_favorited_articles_on_account_id   (account_id)
#  index_case_study_favorited_articles_on_article_id   (article_id)
#  index_cs_favorited_articles_on_account_and_article  (account_id,article_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (article_id => case_study_articles.id)
#
