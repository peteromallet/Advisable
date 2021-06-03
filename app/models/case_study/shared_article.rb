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
#  id             :bigint           not null, primary key
#  archived_at    :datetime
#  message        :text
#  uid            :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  article_id     :bigint           not null
#  shared_by_id   :bigint           not null
#  shared_with_id :bigint           not null
#
# Indexes
#
#  index_case_study_shared_articles_on_article_id      (article_id)
#  index_case_study_shared_articles_on_shared_by_id    (shared_by_id)
#  index_case_study_shared_articles_on_shared_with_id  (shared_with_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (shared_by_id => users.id)
#  fk_rails_...  (shared_with_id => users.id)
#
