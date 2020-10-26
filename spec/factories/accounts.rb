FactoryBot.define do
  factory :account do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence(:uid) { "acc_#{SecureRandom.hex[0..14]}" }
    sequence(:email) { |n| "account_#{n}@test.com" }
    password { 'testing123' }
    confirmed_at { 1.day.ago }
  end
end
