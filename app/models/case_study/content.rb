# frozen_string_literal: true

module CaseStudy
  class Content < ApplicationRecord
    include Uid
    include Resizable

    uid_prefix "csc"

    has_logidze

    belongs_to :section

    has_many_attached :images
    resize_many images: {resize_to_limit: [1600, 1600]}

    validate :valid_content

    scope :by_position, -> { order(:position) }

    private

    def valid_content; end
  end
end

# == Schema Information
#
# Table name: case_study_contents
#
#  id         :bigint           not null, primary key
#  content    :jsonb
#  position   :integer
#  type       :string
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  section_id :bigint           not null
#
# Indexes
#
#  index_case_study_contents_on_section_id  (section_id)
#  index_case_study_contents_on_uid         (uid)
#
# Foreign Keys
#
#  fk_rails_...  (section_id => case_study_sections.id)
#
