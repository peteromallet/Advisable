# frozen_string_literal: true

module Toby
  module Lookups
    module Projects
      class SalesPerson < Attributes::String
        filter :is, Filters::Equals do |records, _attribute, value|
          records.includes(user: {company: :sales_person}).
            where(sales_person: {username: value[0]})
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
          :user_id
        end

        def lazy_model
          User.includes(company: :sales_person)
        end

        def lazy_read(record)
          record&.company&.sales_person&.username
        end
      end
    end
  end
end
