# Class for syncing airtable client contacts to our local users table
class Airtable::ClientContact < Airtable::Base
  self.table_name = 'Client Contacts'

  sync_with ::User
  sync_column 'Email Address', to: :email
  sync_column 'First Name', to: :first_name
  sync_column 'Last Name', to: :last_name
  sync_column 'Title', to: :title
  sync_column 'Project Payment Method', to: :project_payment_method
  sync_column 'Exceptional Project Payment Terms',
              to: :exceptional_project_payment_terms
  sync_column 'Invoice Name', to: :invoice_name
  sync_column 'Invoice Company Name', to: :invoice_company_name
  sync_column 'VAT Number', to: :vat_number
  sync_column 'Type of Company', to: :company_type
  sync_column 'Campaign Name', to: :campaign_name
  sync_column 'Campaign Source', to: :campaign_source
  sync_column 'Contact Status', to: :contact_status
  sync_column 'Campaign Medium', to: :campaign_medium
  sync_column 'PID', to: :pid
  sync_column 'RID', to: :rid
  sync_column 'fid', to: :fid
  sync_column 'gclid', to: :gclid
  sync_column 'Same City Importance', to: :locality_importance
  sync_association 'Industry', to: :industry
  sync_association 'Owner', to: :sales_person

  sync_data do |user|
    if self['Address']
      # sync the address

      user.address = Address.parse(self['Address']).to_h
    end

    user.company_name = self['Company Name'].try(:first)

    # if there is a client_id and it is not already synced then sync it.
    client_id = fields['Client'].try(:first)

    if client_id && user.client.try(:airtable_id) != client_id
      client = ::Client.find_by_airtable_id(client_id)
      client = Airtable::Client.find(client_id).sync if client.nil?
      user.client = client
    end

    sync_budget(user)
  end

  def sync_budget(user)
    amount = self['Estimated Annual Freelancer Spend (USD)']
    return if amount.nil?
    user.budget = amount * 100
  end

  push_data do |user|
    self['Email Address'] = user.email
    self['First Name'] = user.first_name
    self['Last Name'] = user.last_name
    self['Country'] = [user.country.airtable_id] if user.country.present?
    self['Project Payment Method'] = user.project_payment_method
    self['Exceptional Project Payment Terms'] =
      user.exceptional_project_payment_terms
    self['Invoice Name'] = user.invoice_name
    self['Invoice Company Name'] = user.invoice_company_name
    self['VAT Number'] = user.vat_number
    self['Industry'] = [user.industry.try(:airtable_id)].compact
    self['Type of Company'] = user.company_type

    self['PID'] = user.pid
    self['Campaign Name'] = user.campaign_name
    self['Campaign Source'] = user.campaign_source
    self['Campaign Medium'] = user.campaign_medium
    self['RID'] = user.rid
    self['gclid'] = user.gclid
    self['fid'] = user.fid
    self['Application Reminder At'] = user.application_reminder_at
    self['Contact Status'] = user.contact_status
    self['Same City Importance'] = user.locality_importance
    self['Address'] = Address.new(user.address).to_s if user.address
    self['Skills Interested In'] = user.skills.map(&:airtable_id).compact
    self['Application Accepted Timestamp'] = user.application_accepted_at
    self['Application Rejected Timestamp'] = user.application_rejected_at
    self['How many freelancers do you plan on hiring over the next 6 months?'] =
      user.number_of_freelancers

    if user.budget
      self['Estimated Annual Freelancer Spend (USD)'] = user.budget / 100.0
    end
  end
end
