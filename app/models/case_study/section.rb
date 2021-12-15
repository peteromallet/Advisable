# frozen_string_literal: true

module CaseStudy
  class Section < ApplicationRecord
    include Uid
    uid_prefix "css"

    self.inheritance_column = :_type_disabled

    has_logidze

    belongs_to :article
    has_many :contents, dependent: :destroy

    scope :by_position, -> { order(:position) }
  end
end

# == Schema Information
#
# Table name: case_study_sections
#
#  id         :integer          not null, primary key
#  uid        :string           not null
#  article_id :integer          not null
#  type       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_case_study_sections_on_article_id  (article_id)
#  index_case_study_sections_on_uid         (uid) UNIQUE
#
