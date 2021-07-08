# frozen_string_literal: true

module CaseStudy
  class SavedArticle < ApplicationRecord
    belongs_to :user
    belongs_to :article
  end
end

# == Schema Information
#
# Table name: case_study_saved_articles
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_case_study_saved_articles_on_article_id  (article_id)
#  index_case_study_saved_articles_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (user_id => users.id)
#
