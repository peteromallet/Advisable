class Airtable::SalesPerson < Airtable::Base
  self.table_name = 'Salespeople'
  self.base_key = ENV['AIRTABLE_DATABASE_KEY']
  sync_with ::SalesPerson

  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Email', to: :email
  sync_column 'Username', to: :username
  sync_column 'Slack', to: :slack
  sync_column 'Asana ID', to: :asana_id

  sync_data do |record|
    record.active = true if self['Active'] == 'Yes'
    record.active = false if self['Active'] == 'No'
    record.out_of_office = true if self['Out of office'] == 'Yes'
    record.out_of_office = false if self['Out of office'] == 'No'
    sync_image(record)
  end

  private

  def sync_image(sales_person)
    return if self['Image'].blank?

    attached_image = sales_person.image
    filename = attached_image.attached? ? attached_image.filename.to_s : nil
    airtable_filename = self['Image'].try(:first).try(:[], 'filename')
    return if filename == airtable_filename

    AttachImageJob.perform_later(sales_person, self['Image'].first['url'])
  end
end
