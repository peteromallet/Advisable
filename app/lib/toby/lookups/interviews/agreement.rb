# frozen_string_literal: true

module Toby
  module Lookups
    module Interviews
      class Agreement < Attributes::String
        JOIN_CLAUSE = "LEFT JOIN agreements ON interviews.user_id = agreements.user_id AND interviews.specialist_id = agreements.specialist_id"

        include Lookup

        filter "is blank", Filters::CheckNil do |records, _attribute, _value|
          records.joins(JOIN_CLAUSE).where(agreements: {id: nil})
        end

        filter "is not blank", Filters::CheckNotNil do |records, _attribute, _value|
          records.joins(JOIN_CLAUSE).where.not(agreements: {id: nil})
        end

        def lazy_read_class
          Toby::Lazy::Single
        end

        def via
          :id
        end

        def load_records(pending)
          Interview.where(id: pending).joins(JOIN_CLAUSE).pluck("interviews.id", "agreements.uid")
        end
      end
    end
  end
end
