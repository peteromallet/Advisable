# frozen_string_literal: true

# Rake task to set up all the daily and hourly tasks

def airtable_sync
  Airtable.sync
end

def clear_magic_links
  MagicLink.expired.delete_all
end

def clear_unavailable_until_today
  Specialist.where("unavailable_until < ?", Time.zone.today).update_all(unavailable_until: nil)
end

namespace :cron do
  task hourly: :environment do
    airtable_sync
  end

  task daily: :environment do
    clear_magic_links
    clear_unavailable_until_today
  end
end
