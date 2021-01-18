FactoryBot.define do
  factory :message do
    conversation { nil }
    account { nil }
    content { "MyString" }
  end
end
