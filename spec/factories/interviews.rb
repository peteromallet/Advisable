FactoryBot.define do
  factory :interview do
    application
    user
    sequence(:uid) { "int_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "recinterview#{id}" }
    starts_at { 2.days.from_now.change({ hour: 12, min: 0, sec: 0 }) }
  end
end
