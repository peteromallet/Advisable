FactoryBot.define do
  factory :application do
    specialist
    project
    score 9
    status "Applied"
    rate 240
    availability "2 Weeks"
    introduction "Hi there"
    sequence(:airtable_id) { |id| "airtable_#{id}" }
  end
end
