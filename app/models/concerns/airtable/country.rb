class Airtable::Country < Airtable::Base
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Countries"

  has_many :specialists, class: 'Specialist', column: "Specialists"

  # Tells which active record model to sync data with.
  sync_with ::Country
  sync_columns :name, :currency
end
