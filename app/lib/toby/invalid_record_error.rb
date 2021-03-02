# frozen_string_literal: true

module Toby
  class InvalidRecordError < GraphQL::ExecutionError
    def initialize(errors)
      super(
        "Invalid record",
        extensions: {
          errors: errors.as_json
        }
      )
    end
  end
end
