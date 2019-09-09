FactoryBot.define do
  factory :booking do
    application
    rate { 100 }
    sequence(:airtable_id) { |n| "rec_#{n}" }
    rate_type { "Fixed" }
    rate_limit { 5_000 }
    status { "Offered" }
    deliverables { ['This is a devlierable'] }
    start_date { 10.days.from_now }
    end_date { 60.days.from_now }
  end

  factory :proposal, class: Booking do
    application
    rate { 100 }
    sequence(:airtable_id) { |n| "rec_#{n}" }
    rate_type { "Fixed" }
    rate_limit { 5_000 }
    status { "Proposed" }
    deliverables { ['This is a devlierable'] }
    start_date { 10.days.from_now }
    end_date { 60.days.from_now }
  end

  factory :offer, class: Booking do
    application
    rate { 100 }
    sequence(:airtable_id) { |n| "rec_#{n}" }
    rate_type { "Fixed" }
    rate_limit { 5_000 }
    status { "Offered" }
    deliverables { ['This is a devlierable'] }
    start_date { 10.days.from_now }
    end_date { 60.days.from_now }
  end
end
