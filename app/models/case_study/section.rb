# frozen_string_literal: true

module CaseStudy
  class Section < ApplicationRecord
    belongs_to :article
  end
end

# == Schema Information
#
# Table name: case_study_sections
#
#  id         :uuid             not null, primary key
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :uuid             not null
#
# Indexes
#
#  index_case_study_sections_on_article_id  (article_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#
