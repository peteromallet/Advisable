# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class CompanyName < Attributes::StringLookup
        filter "contains...", Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            query = records.joins(application: {project: {user: :company}})
            names = value.first.split
            names.each do |name|
              query = query.where("companies.name ILIKE ?", "%#{name}%")
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
          {project: {user: :company}}
        end

        def via
          :application_id
        end

        def lazy_model
          Application
        end

        def lazy_read(application)
          application&.project&.user&.company&.name
        end
      end
    end
  end
end
