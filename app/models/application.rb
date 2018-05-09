class Application < Airrecord::Table
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Applications"

  belongs_to :specialist, class: 'Specialist', column: "Expert"
end
