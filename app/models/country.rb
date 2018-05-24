class Country < Airrecord::Table
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Countries"

  has_many :specialists, class: 'Specialist', column: "Specialists"
end
