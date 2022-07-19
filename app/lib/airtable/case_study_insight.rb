# frozen_string_literal: true

require "open-uri"

module Airtable
  class CaseStudyInsight < Airrecord::Table
    self.base_key = ENV.fetch("AIRTABLE_DATABASE_KEY", nil)
    self.table_name = "Insights"
  end
end
