# frozen_string_literal: true

module Toby
  module Lookups
    module Payouts
      class CompanyName < Attributes::String
        include Lookup

        filter "contains...", Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            query = records.joins(payment_request: :company)
            names = value.first.split
            names.each do |name|
              query = query.where("companies.name ILIKE ?", "%#{name}%")
            end
            query.distinct
          else
            records
          end
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def includes
          [:company]
        end

        def via
          :payment_request_id
        end

        def lazy_model
          PaymentRequest
        end

        def lazy_read(payment_request)
          payment_request&.company&.name
        end
      end
    end
  end
end
