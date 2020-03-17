FactoryBot.define do
  factory :search do
    user { nil }
    skill { "MyString" }
    industry { "MyString" }
    industry_experience_required { false }
    company_type { "MyString" }
    company_experience_required { false }
    recommended_specialist { "MyString" }
    recommended_project { "MyString" }
  end
end
