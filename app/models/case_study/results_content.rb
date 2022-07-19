# frozen_string_literal: true

module CaseStudy
  class ResultsContent < Content
    uid_prefix "csc"

    def to_text
      results = content["results"]
      results = results.map { |r| r["context"] } if results.first.is_a?(Hash)
      results.join("\n")
    end

    private

    # { type: "results", content: { results: ["1", "2", "3"] } }
    # or
    # { type: "results", content: { results: [{context: "1", callout: "1", category: "1"}, {context: "2", callout: "2", category: "2"}] } }
    def valid_content
      return if content.keys.size == 1 && content["results"].present?

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
