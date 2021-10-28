# frozen_string_literal: true
namespace :airtable do
  task sync: :environment do
    Airtable.sync
  end
end
