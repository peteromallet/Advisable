FactoryBot.define do
  factory :user do
    country
    first_name { "MyString" }
    last_name { "MyString" }
    password { "testing123" }
    company_name { "Test Company" }
    confirmed_at { 2.weeks.ago }
    stripe_customer_id { "cus_1234" }
    sequence(:uid) { "use_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "rec_#{n}" }
    sequence(:email) { |n| "users#{n}@test.com" }

    availability { [
      2.days.from_now.change({ hour: 12, min: 0, sec: 0 }),
      2.days.from_now.change({ hour: 12, min: 30, sec: 0 }),
    ] }
  end
end
