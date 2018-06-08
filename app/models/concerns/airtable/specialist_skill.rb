class Airtable::SpecialistSkill < Airrecord::Table
  self.table_name = "Specialist Skills"
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
end
