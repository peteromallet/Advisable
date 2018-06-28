class Airtable::Project < Airtable::Base
  self.table_name = "Projects"
  # Tells which active record model to sync data with.
  sync_with ::Project
  # We store the project name in a "Project" column on the "Projects" table
  # in airtable.
  sync_column :project, to: :name
  sync_columns :currency

  sync_data do |project|
    project.currency = fields['Currency'].try(:first)
  end
end
