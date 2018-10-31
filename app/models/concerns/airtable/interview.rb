class Airtable::Interview < Airrecord::Table
  self.table_name = "Application Interviews"
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
end
