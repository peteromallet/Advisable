FactoryBot.define do
  factory :webhook_event do
    name { "Test webhook" }
    event { "specialists.application_stage_changed" }
    url { "https://localhost:3000/example" }
  end
end
