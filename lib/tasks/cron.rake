# frozen_string_literal: true

# Rake task to set up all the daily and hourly tasks

def airtable_sync
  Airtable.sync
end

def clear_magic_links
  MagicLink.expired.delete_all
end

def trigger_webhooks_for_past_due_date
  Task.due_date(Date.yesterday).find_each do |task|
    WebhookEvent.trigger("tasks.due_date_past", WebhookEvent::Task.data(task))
  end
end

def trigger_webhooks_for_upcoming_due_date
  Task.due_date(3.days.from_now).find_each do |task|
    WebhookEvent.trigger("tasks.due_date_upcoming", WebhookEvent::Task.data(task))
  end
end

def permanently_delete_soft_deleted_accounts
  AccountDeleteJob.perform_now
end

namespace :cron do
  task hourly: :environment do
    airtable_sync
  end

  task daily: :environment do
    clear_magic_links
    trigger_webhooks_for_past_due_date
    trigger_webhooks_for_upcoming_due_date
    permanently_delete_soft_deleted_accounts
  end
end
