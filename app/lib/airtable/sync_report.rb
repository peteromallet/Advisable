# frozen_string_literal: true

module Airtable
  class SyncReport
    attr_reader :failures

    def initialize
      @failures = []
    end

    def failed(id, type, errors)
      @failures << {
        id:,
        type:,
        errors:
      }
    end
  end
end
