# frozen_string_literal: true

module Airtable
  class CaseStudy < Airrecord::Table
    self.base_key = ENV['AIRTABLE_DATABASE_KEY']
    self.table_name = "Case Studies"

    def import
      ::CaseStudy::Article.find_or_create_by!(airtable_id: id)
    end
  end
end
