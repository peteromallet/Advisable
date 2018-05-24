class Specialist < Airrecord::Table
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Specialists"

  has_many :skills, class: 'Skill', column: "Expertise"
  belongs_to :country, class: "Country", column: "Country"
end
