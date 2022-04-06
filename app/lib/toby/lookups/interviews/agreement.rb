# frozen_string_literal: true

module Toby
  module Lookups
    module Interviews
      class Agreement < Attributes::String
        include Lookup

        filter "is blank", Filters::CheckNil do |records, _attribute, _value|
          records.
            joins("LEFT JOIN agreements ON interviews.user_id = agreements.user_id AND interviews.specialist_id = agreements.specialist_id").
            where(agreements: {id: nil})
        end

        filter "is not blank", Filters::CheckNotNil do |records, _attribute, _value|
          records.
            joins("LEFT JOIN agreements ON interviews.user_id = agreements.user_id AND interviews.specialist_id = agreements.specialist_id").
            where.not(agreements: {id: nil})
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :id
        end

        def load_records(pending)
          Interview.where(id: pending).
            joins("LEFT JOIN agreements ON interviews.user_id = agreements.user_id AND interviews.specialist_id = agreements.specialist_id").
            pluck("interviews.id", "agreements.uid")
        end
      end
    end
  end
end
