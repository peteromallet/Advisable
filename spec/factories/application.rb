FactoryBot.define do
  factory :application do
    specialist
    project
    score { 90 }
    status { "Applied" }
    rate { 240 }
    availability { "2 Weeks" }
    introduction { "Hi there" }
    sequence(:uid) { "app_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "airtable_#{id}" }
  end
end
