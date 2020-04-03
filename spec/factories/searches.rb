FactoryBot.define do
  factory :search do
    user
    association :recommended_project, factory: :previous_project
    skill { 'Skill Name' }
    industry { 'Industry Name' }
    industry_experience_required { false }
    company_type { 'Startup' }
    company_experience_required { false }
  end
end
