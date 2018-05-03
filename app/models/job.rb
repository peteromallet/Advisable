class Job < Airrecord::Table
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  self.table_name = "Projects"

  has_many :candidates, class: 'Candidate', column: "Candidates"
end
