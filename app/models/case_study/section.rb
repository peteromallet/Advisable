# frozen_string_literal: true

module CaseStudy
  class Section < ApplicationRecord
    include Uid
    uid_prefix "css"
    has_logidze

    self.inheritance_column = :_type_disabled

    VALID_TYPES = %w[background overview outcome].freeze

    belongs_to :article
    has_many :contents, dependent: :destroy

    scope :by_position, -> { order(:position) }
    scope :by_type, ->(type) { where(type:) }

    validates :type, inclusion: {in: VALID_TYPES}
  end
end

# == Schema Information
#
# Table name: case_study_sections
#
#  id         :bigint           not null, primary key
#  position   :integer
#  type       :string
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#
# Indexes
#
#  index_case_study_sections_on_article_id  (article_id)
#  index_case_study_sections_on_uid         (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#
