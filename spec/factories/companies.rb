# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    name { "Test Company" }
    kind { "Startup" }
    industry
    business_type { "B2B" }
    goals { ["My Goal"] }
    budget { 200000 }
    feedback { false }
    stripe_customer_id { "cus_1234" }
    payments_setup { true }
  end
end
