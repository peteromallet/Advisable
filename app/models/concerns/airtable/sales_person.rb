class Airtable::SalesPerson < Airtable::Base
  self.table_name = "Salespeople"
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
  sync_with ::SalesPerson

  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Email', to: :email
  sync_column 'Username', to: :username
  sync_column 'Slack', to: :slack
  sync_column 'Asana ID', to: :asana_id

  sync_data do |record|
    record.active = true if self['Active'] == "Yes"
    record.active = false if self['Active'] == "No"
    record.out_of_office = true if self['Out of office'] == "Yes"
    record.out_of_office = false if self['Out of office'] == "No"
  end
end
