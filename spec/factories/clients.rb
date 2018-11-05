FactoryBot.define do
  factory :client do
    name "Apple"

    after(:create) do |client|
      create(:client_user, client: client)
    end
  end
end
