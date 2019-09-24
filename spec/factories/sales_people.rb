FactoryBot.define do
  factory :sales_person do
    first_name { "MyString" }
    last_name { "MyString" }
    email { "MyString" }
    username { "MyString" }
    active { false }
    out_of_office { false }
    slack { "MyString" }
    calendly_url { "MyString" }
    asana_id { "MyString" }
    airtable_id { "MyString" }
  end
end
