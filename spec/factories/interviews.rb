FactoryBot.define do
  factory :interview do
    application
    sequence(:airtable_id) { |id| "interview_#{id}" }
    starts_at 2.days.from_now.change({ hour: 12, min: 0, sec: 0 })
    availability [
      2.days.from_now.change({ hour: 12, min: 0, sec: 0 }),
      2.days.from_now.change({ hour: 12, min: 30, sec: 0 }),
    ]
  end
end
