class Airtable::Client < Airtable::Base
  self.table_name = "Clients"

  sync_with ::Client
  sync_column :client_name, to: :name

  push_data do |client|
    self['Client Name'] = client.name
  end
end
