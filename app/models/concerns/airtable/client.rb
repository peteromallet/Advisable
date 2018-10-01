class Airtable::Client < Airtable::Base
  self.table_name = "Clients"

  sync_with ::Client
  sync_column :client_name, to: :name
end
