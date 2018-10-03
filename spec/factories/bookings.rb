FactoryBot.define do
  factory :booking do
    rate 100
    airtable_id 'rec_1234'
    rate_type "Fixed"
    rate_limit 5_000
    status "Offered"
    deliverables []
    application
  end
end
