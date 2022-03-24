# frozen_string_literal: true

module Toby
  module Lookups
    module Agreements
      class DeclinedMessage < Attributes::String
        include Lookup

        def lazy_read_class
          Toby::Lazy::Single
        end

        def includes
          [:messages]
        end

        def via
          :id
        end

        def lazy_model
          Agreement
        end

        # Don't optimize this by using the `.where` method, because then we can't lazy load the messages
        def lazy_read(agreement)
          agreement.messages.reverse.find { |m| m.kind == "AgreementDeclined" }&.content
        end
      end
    end
  end
end
