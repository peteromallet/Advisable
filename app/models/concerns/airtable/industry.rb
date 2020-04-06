class Airtable::Industry < Airtable::Base
  self.table_name = 'Industries'

  sync_with ::Industry
  sync_column 'Name', to: :name

  sync_data { |industry| industry.active = self['Active'].include?('Yes') }
end
