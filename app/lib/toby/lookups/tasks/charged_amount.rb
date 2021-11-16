# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class ChargedAmount < Attributes::Currency
        include Lookup

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :id
        end

        def includes
          [:payments]
        end

        def lazy_model
          Task
        end

        def lazy_read(task)
          task&.payments&.sum { |payment| payment.amount_with_fee }
        end
      end
    end
  end
end
