FactoryBot.define do
  factory :off_platform_project do
    specialist nil
    industry "Web Development"
    contact_first_name "Thomas"
    contact_last_name "Cullen"
    contact_job_title "Developer"
    client_name "Acme Corp"
    client_description "A description"
    description "A description"
    requirements "Requirements"
    results "Results"
    primary_skill "Ruby on Rails"
    confidential false
  end
end
