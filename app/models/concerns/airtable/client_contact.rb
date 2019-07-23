# Class for syncing airtable client contacts to our local users table
class Airtable::ClientContact < Airtable::Base
  self.table_name = 'Client Contacts'

  sync_with ::User
  sync_column 'Email Address', to: :email
  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Title', to: :title
  sync_column 'Project Payment Method', to: :project_payment_method
  sync_column 'Exceptional Project Payment Terms', to: :exceptional_project_payment_terms
  sync_column 'Invoice Name', to: :invoice_name
  sync_column 'Invoice Company Name', to: :invoice_company_name
  sync_column 'VAT Number', to: :vat_number

  sync_data do |user|
    # sync the address
    if self['Address']
      user.address = Address.parse(self['Address']).to_h
    end

    # if there is a client_id and it is not already synced then sync it.
    client_id = fields["Client"].try(:first)
    if client_id && user.client.try(:airtable_id) != client_id
      client = ::Client.find_by_airtable_id(client_id)
      client = Airtable::Client.find(client_id).sync if client.nil?
      user.client = client
    end
  end

  push_data do |user|
    self['Email Address'] = user.email
    self['First Name'] = user.first_name
    self['Last Name'] = user.last_name
    self['Country'] = [user.country.airtable_id] if user.country.present?
    self['Project Payment Method'] = user.project_payment_method
    self['Exceptional Project Payment Terms'] = user.exceptional_project_payment_terms
    self['Invoice Name'] = user.invoice_name
    self['Invoice Company Name'] = user.invoice_company_name
    self['VAT Number'] = user.vat_number
    
    if user.address
      self['Address'] = Address.new(user.address).to_s
    end
  end
end
