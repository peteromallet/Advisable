# frozen_string_literal: true

module Toby
  module Lookups
    module Consultations
      class RequestUrl < Attributes::String
        def self.lookup?
          true
        end

        def readonly
          true
        end

        def read(record)
          "#{ENV["ORIGIN"]}/request_consultation/#{record.specialist.uid}?consultation=#{record.uid}"
        end
      end
    end
  end
end
