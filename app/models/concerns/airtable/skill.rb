class Airtable::Skill < Airtable::Base
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Skills"

  # Tells which active record model to sync data with.
  sync_with ::Skill
  sync_columns :name
end
