class Specialist < Airrecord::Table
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Specialists"
end
