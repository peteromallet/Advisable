# frozen_string_literal: true

module Toby
  module Lookups
    module Specialists
      class ConsultationUrl < Attributes::String
        def self.lookup?
          true
        end

        def readonly
          true
        end

        def read(record)
          "#{ENV["ORIGIN"]}/request_consultation/#{record.uid}"
        end
      end
    end
  end
end
