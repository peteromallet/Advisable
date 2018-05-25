namespace :airtable do
  task sync: :environment do
    Airtable.sync
  end
end
