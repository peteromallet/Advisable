FactoryBot.define do
  factory :consultation do
    specialist
    user
    status { "MyString" }
    requested_time { "2019-11-21 11:20:29" }
    topic { "MyString" }
    airtable_id { "MyString" }
  end
end
