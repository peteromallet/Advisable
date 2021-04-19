# frozen_string_literal: true

module CaseStudy
  class ImagesContent < Content
    private

    # {type: "images"}
    def valid_content
      return if content.blank?

      errors.add(:content, "does not follow the type's requirements")
    end
  end
end

# == Schema Information
#
# Table name: case_study_contents
#
#  id         :uuid             not null, primary key
#  content    :jsonb
#  position   :integer
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  section_id :uuid             not null
#
# Indexes
#
#  index_case_study_contents_on_section_id  (section_id)
#
# Foreign Keys
#
#  fk_rails_...  (section_id => case_study_sections.id)
#
