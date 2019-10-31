class Airtable::Client < Airtable::Base
  self.table_name = "Clients"

  sync_with ::Client
  sync_column 'Client Name', to: :name
  sync_column 'Domain', to: :domain

  push_data do |client|
    self['Client Name'] = client.name
    self['Domain'] = client.domain
  end
end
