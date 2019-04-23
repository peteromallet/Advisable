# Class for syncing airtable client contacts to our local users table
class Airtable::ClientContact < Airtable::Base
  self.table_name = 'Client Contacts'

  sync_with ::User
  sync_column 'Email Address', to: :email
  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Title', to: :title

  sync_data do |user|
    client_id = fields["Client"].try(:first)

    # if there is a client_id and it is not already synced then sync it.
    if client_id && user.client.try(:airtable_id) != client_id
      client = Client.find_by_airtable_id(client_id)
      client = Airtable::Client.find(client_id).sync if client.nil?
      user.client = client
    end
  end

  push_data do |user|
    self['Email Address'] = user.email
    self['First Name'] = user.first_name
    self['Last Name'] = user.last_name
    self['Country'] = [user.country.airtable_id] if user.country.present?
  end
end
