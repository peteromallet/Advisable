FactoryBot.define do
  factory :company do
    name { "Test Company" }
    kind { "Startup" }
    industry
    business_type { "B2B" }
    goals { ["My Goal"] }
    budget { 200000 }
    feedback { false }
    marketing_attitude { "We’re pretty happy with our strategy & tactics" }
    stripe_customer_id { "cus_1234" }
    payments_setup { true }
  end
end
