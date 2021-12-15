# frozen_string_literal: true

module CaseStudy
  class ArchivedArticle < ApplicationRecord
    belongs_to :user
    belongs_to :article
  end
end

# == Schema Information
#
# Table name: case_study_archived_articles
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  article_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_case_study_archived_articles_on_article_id  (article_id)
#  index_case_study_archived_articles_on_user_id     (user_id)
#
