# frozen_string_literal: true

module Toby
  module Lookups
    module CaseStudy
      module Articles
        class PrimarySkill < Attributes::String
          include Lookup

          filter "contains...", Filters::StringContains do |records, _attribute, value|
            if value.any? && value.first.present?
              records.
                joins(skills: :skill).
                where(case_study_skills: {primary: true}).
                where("skills.name ILIKE ?", "%#{value.first}%")
            else
              records
            end
          end

          def lazy_read_class
            Toby::Lazy::Single
          end

          def via
            :id
          end

          def load_records(pending)
            ::CaseStudy::Skill.
              where(article_id: pending, primary: true).
              includes(:skill).
              pluck(:article_id, :name)
          end
        end
      end
    end
  end
end
