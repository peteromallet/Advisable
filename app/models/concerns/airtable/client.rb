class Airtable::Client < Airtable::Base
  self.table_name = "Clients"

  sync_with ::Client
  sync_column 'Client Name', to: :name

  push_data do |client|
    self['Client Name'] = client.name
  end
end
