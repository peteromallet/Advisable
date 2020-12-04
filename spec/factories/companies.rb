FactoryBot.define do
  factory :company do
    name { 'Test Company' }
    kind { 'Startup' }
    industry
    stripe_customer_id { 'cus_1234' }
    payments_setup { true }
  end
end
