FactoryBot.define do
  factory :user do
    country
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { "testing123" }
    company_name { Faker::Company.name }
    confirmed_at { 2.weeks.ago }
    stripe_customer_id { SecureRandom.uuid }
    payments_setup { true }
    sequence(:uid) { "use_#{SecureRandom.hex[0..14]}" }
    airtable_id { SecureRandom.uuid }
    email { Faker::Internet.email }

    availability { [
      2.days.from_now.change({ hour: 12, min: 0, sec: 0 }),
      2.days.from_now.change({ hour: 12, min: 30, sec: 0 }),
    ] }
  end
end
