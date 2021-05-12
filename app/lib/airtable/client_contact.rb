# frozen_string_literal: true

# Class for syncing airtable client contacts to our local users table
module Airtable
  class ClientContact < Airtable::Base
    include Airtable::UnsubscribedFrom

    self.table_name = 'Client Contacts'

    sync_with ::User

    sync_column_to_association 'Email Address', association: :account, to: :email
    sync_column_to_association 'First Name', association: :account, to: :first_name
    sync_column_to_association 'Last Name', association: :account, to: :last_name
    sync_column_to_association 'VAT Number', association: :company, to: :vat_number
    sync_column_to_association 'Type of Company', association: :company, to: :kind
    sync_column_to_association 'Project Payment Method', association: :company, to: :project_payment_method
    sync_column_to_association 'Invoice Name', association: :company, to: :invoice_name
    sync_column_to_association 'Invoice Company Name', association: :company, to: :invoice_company_name

    sync_column 'Title', to: :title
    sync_column 'Exceptional Project Payment Terms', to: :exceptional_project_payment_terms
    sync_column 'Campaign Name', to: :campaign_name
    sync_column 'Campaign Source', to: :campaign_source
    sync_column 'Contact Status', to: :contact_status
    sync_column 'Campaign Medium', to: :campaign_medium
    sync_column 'PID', to: :pid
    sync_column 'RID', to: :rid
    sync_column 'fid', to: :fid
    sync_column 'gclid', to: :gclid
    sync_column 'Same City Importance', to: :locality_importance

    sync_data do |user|
      user.company.address = Address.parse(self['Address']).to_h if self["Address"]

      sales_person_airtable_id = fields['Owner'].try(:first)
      if sales_person_airtable_id
        sales_person = ::SalesPerson.find_by(airtable_id: sales_person_airtable_id)
        if sales_person.nil?
          airtable_sp = Airtable::SalesPerson.find(sales_person_airtable_id)
          sales_person = airtable_sp.sync
        end
        user.company.update(sales_person: sales_person)
      end

      user.company_name = self['Company Name'].try(:first) # WIP Company migration

      user.company.name = self['Company Name'].try(:first)
      industry_id = self['Industry'].try(:first)
      if industry_id
        industry = ::Industry.find_by_airtable_id(industry_id)
        industry = Airtable::Industry.find(industry_id).sync if industry.nil?
        user.company.industry = industry
      end

      user.account.test_account = true if fields['Test Account'].try(:include?, 'Yes')

      sync_budget(user)
      sync_unsubscribed_from(user)
    end

    def sync_budget(user)
      amount = self['Estimated Annual Freelancer Spend (USD)']
      return if amount.nil?

      user.company.budget = amount * 100
    end

    # After the syncing process has been complete
    after_sync do |user|
      if user.account.blank?
        user.destroy
        break
      end
    end

    push_data do |user|
      self['UID'] = user.uid
      self['Email Address'] = user.account.email
      self['First Name'] = user.account.first_name
      self['Last Name'] = user.account.last_name
      self['Country'] = [user.country.airtable_id] if user.country.present?
      self['Project Payment Method'] = user.company.project_payment_method || "Card"
      self['Exceptional Project Payment Terms'] = user.exceptional_project_payment_terms
      self['Invoice Name'] = user.company.invoice_name
      self['Invoice Company Name'] = user.company.invoice_company_name
      self['VAT Number'] = user.company.vat_number
      self['Industry'] = [user.company.industry.try(:airtable_id)].compact
      self['Type of Company'] = user.company.kind
      self['Owner'] = [user.company.sales_person&.airtable_id].compact
      self['PID'] = user.pid
      self['Campaign Name'] = user.campaign_name
      self['Campaign Source'] = user.campaign_source
      self['Campaign Medium'] = user.campaign_medium
      self['RID'] = user.rid
      self['gclid'] = user.gclid
      self['fid'] = user.fid
      self['City'] = user.company.address.try(:[], 'city')
      self['Application Reminder At'] = user.application_reminder_at
      self['Contact Status'] = user.contact_status
      self['Same City Importance'] = user.locality_importance
      self['Address'] = Address.new(user.company.address).to_s if user.company.address.present?
      self['Skills Interested In'] = user.skills.filter_map(&:airtable_id).uniq
      self['Application Accepted Timestamp'] = user.application_accepted_at
      self['Application Rejected Timestamp'] = user.application_rejected_at
      self['How many freelancers do you plan on hiring over the next 6 months?'] = user.number_of_freelancers
      self['Estimated Annual Freelancer Spend (USD)'] = user.company.budget / 100.0 if user.company.budget
      push_unsubscribed_from(user)
    end
  end
end
