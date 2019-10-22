FactoryBot.define do
  factory :project do
    user
    currency { "EUR" }
    sales_status { "Open" }
    company_type { "Startup" }
    industry { "Marketing" }
    name { "Firespring – Public Relations and Communications Marketing, Publicity" }
    sequence(:airtable_id) { |id| "airtable_#{id}" }
  end
end
