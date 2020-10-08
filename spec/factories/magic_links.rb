FactoryBot.define do
  factory :magic_link do
    account
    path { "/" }
    expires_at { 1.day.from_now }
  end
end
