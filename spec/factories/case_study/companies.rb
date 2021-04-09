# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_company, class: 'CaseStudy::Company' do
    name { "MyString" }
    description { "MyText" }
    website { "MyString" }
    business_type { "MyString" }
  end
end
