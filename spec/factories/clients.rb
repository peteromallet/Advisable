FactoryBot.define do
  factory :client do
    name "Apple"
    availability [
      2.days.from_now.change({ hour: 12, min: 0, sec: 0 }),
      2.days.from_now.change({ hour: 12, min: 30, sec: 0 }),
    ]
  end
end
