FactoryBot.define do
  factory :company do
    name { 'Test Company' }
    kind { 'Startup' }
    industry
  end
end
