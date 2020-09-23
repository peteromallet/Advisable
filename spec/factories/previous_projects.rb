FactoryBot.define do
  factory :previous_project do
    specialist
    sequence(:airtable_id) { |id| "recpreviousproject#{id}" }
    company_type { 'Startup' }
    contact_first_name { 'Thomas' }
    contact_last_name { 'Cullen' }
    contact_job_title { 'Developer' }
    client_name { 'Acme Corp' }
    client_description { 'A description' }
    description { 'A description' }
    requirements { 'Requirements' }
    results { 'Results' }
    validation_status { 'Pending' }
    association :primary_skill, factory: :skill
    association :primary_industry, factory: :industry
    confidential { false }
  end
end
