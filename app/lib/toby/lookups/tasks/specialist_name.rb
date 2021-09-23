# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class SpecialistName < Attributes::String
        filter 'contains...', Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            query = records.joins(application: {specialist: :account})
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

        def self.lookup?
          true
        end

        def readonly
          true
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def includes
          {specialist: :account}
        end

        def via
          :application_id
        end

        def lazy_model
          Application
        end

        def lazy_read(application)
          application&.specialist&.account&.name
        end
      end
    end
  end
end
