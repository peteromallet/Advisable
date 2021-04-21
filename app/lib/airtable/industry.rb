class Airtable::Industry < Airtable::Base
  self.table_name = 'Industries'

  sync_with ::Industry
  sync_column 'Name', to: :name

  sync_data do |industry|
    industry.active = self['Active'].try(:include?, 'Yes')
  end
end
