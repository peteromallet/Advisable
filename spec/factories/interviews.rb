FactoryBot.define do
  factory :interview do
    application
    user
    airtable_id { SecureRandom.uuid }
    starts_at { 2.days.from_now.change({ hour: 12, min: 0, sec: 0 }) }
    time_zone { ActiveSupport::TimeZone.all.sample.tzinfo.name }
    zoom_meeting_id { Faker::Internet.password }
  end
end
