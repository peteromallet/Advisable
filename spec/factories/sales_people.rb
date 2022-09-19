# frozen_string_literal: true

FactoryBot.define do
  factory :sales_person do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence(:email) { |n| "sales_person_#{n}@test.com" }
    sequence(:username) { |n| "sales_person_#{n}" }
    active { false }
    out_of_office { false }
    slack { "MyString" }
    calendly_url { "MyString" }
    asana_id { "MyString" }
    airtable_id { "MyString" }
  end
end
