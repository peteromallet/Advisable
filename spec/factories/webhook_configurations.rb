FactoryBot.define do
  factory :webhook_configuration do
    name { "Test webhook config" }
    url { "http://localhost:3000/test" }
    type { "WebhookConfiguration::Application" }
    criteria {
      [
        {
          attribute: "status",
          operator: "changes_to",
          value: "Application Accepted"
        }
      ]
    }
  end
end
