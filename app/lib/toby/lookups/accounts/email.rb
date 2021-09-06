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

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :account_id
        end

        def lazy_model
          Account
        end

        def lazy_read(record)
          record&.email
        end
      end
    end
  end
end
