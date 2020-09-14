FactoryBot.define do
  factory :answer do
    question
    specialist
    content { "Black bear." }
  end
end
