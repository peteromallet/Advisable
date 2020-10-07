FactoryBot.define do
  factory :magic_link do
    account
    path { "/" }
    uses_remaining { 1 }
    expires_at { 1.day.from_now }
  end
end
