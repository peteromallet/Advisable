# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class InvoiceRate < Attributes::StringLookup
        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :application_id
        end

        def lazy_model
          Application
        end

        def lazy_read(application)
          application&.invoice_rate
        end
      end
    end
  end
end
