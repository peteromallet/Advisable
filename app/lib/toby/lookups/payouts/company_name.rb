# frozen_string_literal: true

module Toby
  module Lookups
    module Payouts
      class CompanyName < Attributes::StringLookup
        filter "contains...", Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            query = records.joins(task: {application: {project: {user: :company}}})
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
          {application: {project: {user: :company}}}
        end

        def via
          :task_id
        end

        def lazy_model
          Task
        end

        def lazy_read(task)
          task&.application&.project&.user&.company&.name
        end
      end
    end
  end
end
