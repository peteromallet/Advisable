class Airtable::Industry < Airtable::Base
  self.table_name = "Industries"

  sync_with ::Industry
  sync_column 'Name', to: :name

  # We overwrite the model method from inside of Airtable::Base to fetch
  # records to sync based off of the name rather than the airtable_id.
  # TODO: This can be removed once the industries have initially been synced.
  def model
    @model ||= Industry.find_or_initialize_by(name: self['Name'])
  end

  sync_data do |industry|
    # Manually sync the airtable id for now
    # TODO: This can be removed once the industries have initially been synced.
    industry.airtable_id = id
  end
end
