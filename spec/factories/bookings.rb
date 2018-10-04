FactoryBot.define do
  factory :booking do
    rate 100
    airtable_id 'rec_1234'
    rate_type "Fixed"
    rate_limit 5_000
    status "Offered"
    deliverables []
    application
    start_date 10.days.from_now
    end_date 60.days.from_now
  end
end
