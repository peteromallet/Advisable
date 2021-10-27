# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class ChargedAt < Attributes::String
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
          task&.payments&.map { |payment| payment.charged_at&.strftime("%m/%d/%Y, %I:%m %p") || "-" }
        end
      end
    end
  end
end
