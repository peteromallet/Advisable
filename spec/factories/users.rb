FactoryBot.define do
  factory :user do
    country
    industry
    first_name { 'MyString' }
    last_name { 'MyString' }
    password { 'testing123' }
    company_name { 'Test Company' }
    company_type { 'Startup' }
    confirmed_at { 2.weeks.ago }
    stripe_customer_id { 'cus_1234' }
    payments_setup { true }
    sequence(:uid) { "use_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "recuser#{n}" }
    sequence(:email) { |n| "users#{n}@test.com" }

    availability do
      [
        2.days.from_now.change({ hour: 12, min: 0, sec: 0 }),
        2.days.from_now.change({ hour: 12, min: 30, sec: 0 })
      ]
    end
  end
end
