FactoryBot.define do
  factory :booking do
    rate 1
    rate_type "MyString"
    rate_limit 1
    status "MyString"
    deliverables ""
    specialist nil
    project nil
  end
end
