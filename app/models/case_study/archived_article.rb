# frozen_string_literal: true

module CaseStudy
  class ArchivedArticle < ApplicationRecord
    belongs_to :user
    belongs_to :article
    belongs_to :search, optional: true
    belongs_to :shared_by, class_name: "::User", inverse_of: :archived_sent_articles, optional: true
  end
end

# == Schema Information
#
# Table name: case_study_archived_articles
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  article_id   :bigint           not null
#  search_id    :bigint
#  shared_by_id :bigint
#  user_id      :bigint           not null
#
# Indexes
#
#  index_case_study_archived_articles_on_article_id    (article_id)
#  index_case_study_archived_articles_on_search_id     (search_id)
#  index_case_study_archived_articles_on_shared_by_id  (shared_by_id)
#  index_case_study_archived_articles_on_user_id       (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (search_id => case_study_searches.id)
#  fk_rails_...  (shared_by_id => users.id)
#  fk_rails_...  (user_id => users.id)
#
