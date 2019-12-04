FactoryBot.define do
  factory :consultation do
    user
    skill
    specialist
    status { "Request Started" }
    topic { "Consultation Topic" }
    airtable_id { "rec_123" }
  end
end
