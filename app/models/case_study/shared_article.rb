# frozen_string_literal: true

module CaseStudy
  class SharedArticle < ApplicationRecord
    include Uid

    belongs_to :article
    belongs_to :shared_with, class_name: "::User", inverse_of: :received_articles
    belongs_to :shared_by, class_name: "::User", inverse_of: :sent_articles, optional: true
  end
end

# == Schema Information
#
# Table name: case_study_shared_articles
#
#  id             :integer          not null, primary key
#  article_id     :integer          not null
#  shared_with_id :integer          not null
#  shared_by_id   :integer          not null
#  message        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  uid            :string           not null
#
# Indexes
#
#  index_case_study_shared_articles_on_article_id      (article_id)
#  index_case_study_shared_articles_on_shared_by_id    (shared_by_id)
#  index_case_study_shared_articles_on_shared_with_id  (shared_with_id)
#  index_case_study_shared_articles_on_uid             (uid) UNIQUE
#
