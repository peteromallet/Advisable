# frozen_string_literal: true

module Toby
  module Lookups
    module CaseStudy
      module Articles
        class SpecialistName < Attributes::StringLookup
          filter "contains...", Filters::StringContains do |records, _attribute, value|
            if value.any? && value.first.present?
              query = records.joins(specialist: :account)
              names = value.first.split
              names.each do |name|
                query = query.where("accounts.first_name ILIKE ?", "%#{name}%").
                  or(query.where("accounts.last_name ILIKE ?", "%#{name}%"))
              end
              query
            else
              records
            end
          end

          def lazy_read_class
            Toby::Lazy::Single
          end

          def includes
            [:account]
          end

          def via
            :specialist_id
          end

          def lazy_model
            Specialist
          end

          def lazy_read(specialist)
            specialist&.account&.name
          end
        end
      end
    end
  end
end
