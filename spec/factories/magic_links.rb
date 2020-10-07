FactoryBot.define do
  factory :magic_link do
    account { nil }
    url { "MyString" }
    uses_remaining { "MyString" }
    digest { "MyString" }
    expires_at { "2020-10-07 11:09:44" }
  end
end
