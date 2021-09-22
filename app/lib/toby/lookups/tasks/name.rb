# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class Name < Attributes::String
        filter 'contains...', Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            records.where(task: Task.where("name ILIKE ?", "%#{value.first}%"))
          else
            records
          end
        end

        def self.lookup?
          true
        end

        def readonly
          true
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :task_id
        end

        def lazy_model
          Task
        end

        def lazy_read(task)
          task&.name
        end
      end
    end
  end
end
