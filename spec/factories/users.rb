FactoryBot.define do
  factory :user do
    account
    country
    industry
    first_name { 'MyString' }
    last_name { 'MyString' }
    company_name { 'Test Company' }
    company_type { 'Startup' }
    stripe_customer_id { 'cus_1234' }
    payments_setup { true }
    sequence(:uid) { "use_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "recuser#{n}" }

    availability do
      [
        2.days.from_now.change({hour: 12, min: 0, sec: 0}),
        2.days.from_now.change({hour: 12, min: 30, sec: 0})
      ]
    end
  end
end
