FactoryBot.define do
  factory :consultation do
    specialist
    user
    skill
    status { "Request Started" }
    topic { "Consultation Topic" }
    airtable_id { "rec_123" }
  end
end
