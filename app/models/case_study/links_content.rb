# frozen_string_literal: true

module CaseStudy
  class LinksContent < Content
    uid_prefix "csc"

    private

    # { type: "links", content: { links: ["link1", "link2",...] } }
    def valid_content
      return if content.keys.size == 1 && content["links"].present?

      errors.add(:content, "does not follow the type's requirements")
    end
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
#  index_case_study_contents_on_uid         (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (section_id => case_study_sections.id)
#
