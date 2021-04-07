# frozen_string_literal: true

module Toby
  module Lookups
    module Accounts
      class Email < Attributes::String
        filter :is, Filters::Equals do |records, value|
          records.includes(:account).
            where(accounts: {email: value[0]})
        end

        def self.lookup?
          true
        end

        def readonly
          true
        end

        def read(resource)
          resource.account&.email
        end
      end
    end
  end
end
