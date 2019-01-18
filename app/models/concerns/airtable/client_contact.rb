# Class for syncing airtable client contacts to our local users table
class Airtable::ClientContact < Airtable::Base
  self.table_name = 'Client Contacts'

  sync_with ::User
  sync_column 'Email Address', to: :email
  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Title', to: :title

  sync_data do |user|
    # currently the company name is a lookup type in airtable which
    # gets returned as an array.
    company_name = fields['Company Name']
    if company_name.is_a?(Array)
      user.company_name = company_name.try(:first)
    else
      user.company_name = company_name
    end
  end

  push_data do |user|
    self['Email Address'] = user.email
    self['First Name'] = user.first_name
    self['Last Name'] = user.last_name
    self['Country'] = [user.country.airtable_id] if user.country.present?
    self['Company Name'] = user.company_name
  end
end
