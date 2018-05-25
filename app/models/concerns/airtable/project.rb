class Airtable::Project < Airtable::Base
  self.table_name = "Projects"
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]

  # Tells which active record model to sync data with.
  sync_with ::Project

  # How the data should be synced
  sync_data do |project|
    project.name = self[:project]
  end
end
