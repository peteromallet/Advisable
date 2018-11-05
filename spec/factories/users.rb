FactoryBot.define do
  factory :user do
    first_name "MyString"
    last_name "MyString"

    availability [
      2.days.from_now.change({ hour: 12, min: 0, sec: 0 }),
      2.days.from_now.change({ hour: 12, min: 30, sec: 0 }),
    ]
  end
end
