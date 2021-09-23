# frozen_string_literal: true

module Toby
  module Lookups
    module Specialists
      class ConsultationUrl < Attributes::StringLookup
        def read(record)
          "#{ENV["ORIGIN"]}/request_consultation/#{record.uid}"
        end
      end
    end
  end
end
