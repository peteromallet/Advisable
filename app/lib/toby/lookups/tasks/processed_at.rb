# frozen_string_literal: true

module Toby
  module Lookups
    module Tasks
      class ProcessedAt < Attributes::DateTime
        include Lookup

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :id
        end

        def includes
          [:payout]
        end

        def lazy_model
          Task
        end

        def lazy_read(task)
          task&.payout&.processed_at
        end
      end
    end
  end
end
