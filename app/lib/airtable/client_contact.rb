# frozen_string_literal: true

# Class for syncing airtable client contacts to our local users table
module Airtable
  class ClientContact < Airtable::Base
    include Airtable::UnsubscribedFrom
    self.table_name = "Client Contacts"
    sync_with ::User

    push_data do |user|
      self["UID"] = user.uid
      self["Email Address"] = user.account.email
      self["First Name"] = user.account.first_name
      self["Last Name"] = user.account.last_name
      self["Country"] = [user.country.airtable_id] if user.country.present?
      self["Project Payment Method"] = user.company.project_payment_method || "Card"
      self["Exceptional Project Payment Terms"] = user.exceptional_project_payment_terms
      self["Industry"] = [user.company.industry.try(:airtable_id)].compact
      self["Type of Company"] = user.company.kind
      self["Owner"] = [user.company.sales_person&.airtable_id].compact
      self["PID"] = user.pid
      self["Campaign Name"] = user.campaign_name
      self["Campaign Source"] = user.campaign_source
      self["Campaign Medium"] = user.campaign_medium
      self["RID"] = user.rid
      self["gclid"] = user.gclid
      self["fid"] = user.fid
      self["City"] = user.company.address.try(:[], "city")
      self["Application Reminder At"] = user.application_reminder_at
      self["Contact Status"] = user.contact_status
      self["Same City Importance"] = user.locality_importance
      self["Skills Interested In"] = user.skills.filter_map(&:airtable_id).uniq
      self["Application Accepted Timestamp"] = user.application_accepted_at
      self["Application Rejected Timestamp"] = user.application_rejected_at
      self["How many freelancers do you plan on hiring over the next 6 months?"] = user.number_of_freelancers
      self["Estimated Annual Freelancer Spend (USD)"] = user.company.budget / 100.0 if user.company.budget
      self["Trustpilot Review Status"] = user.trustpilot_review_status
      push_unsubscribed_from(user)
    end
  end
end
