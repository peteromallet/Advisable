class Airtable::Project < Airtable::Base
  self.table_name = "Projects"
  # Tells which active record model to sync data with.
  sync_with ::Project
  # We store the project name in a "Project" column on the "Projects" table
  # in airtable.
  sync_column :project, to: :name
  sync_column :project_stage, to: :status
  sync_columns :currency, :client_referral_url

  sync_data do |project|
    project.currency = fields['Currency'].try(:first)

    client_id = fields["Client"].try(:first)
    if client_id
      client = ::Client.find_by_airtable_id(client_id)
      client = Airtable::Client.find(client_id).sync if client.nil?
      project.client = client
    end
  end
end
