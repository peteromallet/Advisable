# frozen_string_literal: true

# Rake task to set up all the daily and hourly tasks

def airtable_sync
  Airtable.sync
end

def clear_magic_links
  MagicLink.expired.delete_all
end

def permanently_delete_soft_deleted_accounts
  AccountDeleteJob.perform_now
end

def clear_unavailable_until_today
  Specialist.where("unavailable_until < ?", Time.zone.today).update_all(unavailable_until: nil) # rubocop:disable Rails/SkipsModelValidations
end

def create_invoices
  today = Time.zone.today
  return unless today == today.beginning_of_month

  yesterday = Time.zone.yesterday
  last_months_payments = Payment.with_status("succeeded").where(created_at: yesterday.beginning_of_month..today)
  companies_with_payments = Company.where(id: last_months_payments.select(:company_id))
  companies_with_payments.each do |company|
    invoice = Invoice.create(company: company, year: yesterday.year, month: yesterday.month)
    GenerateInvoicePdfJob.perform_later(invoice)
  end
end

def topup_case_study_searches
  RefreshCaseStudySearchesJob.perform_now
end

namespace :cron do
  task hourly: :environment do
    airtable_sync
  end

  task daily: :environment do
    clear_magic_links
    permanently_delete_soft_deleted_accounts
    clear_unavailable_until_today
    create_invoices
  end

  task weekly: :environment do
    topup_case_study_searches
  end
end
