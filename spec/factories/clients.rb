FactoryBot.define do
  factory :client do
    name { "Apple" }
    sequence(:airtable_id) { |n| "rec_client_#{n}" }

    after(:create) do |client|
      create(:client_user, client: client)
    end
  end
end
