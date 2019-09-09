FactoryBot.define do
  factory :webhook_event do
    name { "Test webhook" }
    event { "specialists.forgotten_password_for_non_account" }
    url { "https://localhost:3000/example" }
  end
end
