# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_company, class: 'CaseStudy::Company' do
    sequence(:uid) { "cas_#{SecureRandom.hex[0..14]}" }
    name { "MyString" }
    description { "MyText" }
    website { "MyString" }
    business_type { "MyString" }
  end
end
