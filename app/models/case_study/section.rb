# frozen_string_literal: true

module CaseStudy
  class Section < ApplicationRecord
    self.inheritance_column = :_type_disabled

    has_logidze

    belongs_to :article
    has_many :contents, dependent: :destroy
  end
end

# == Schema Information
#
# Table name: case_study_sections
#
#  id         :uuid             not null, primary key
#  position   :integer
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
