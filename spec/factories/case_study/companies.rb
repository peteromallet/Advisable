# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_company, class: "CaseStudy::Company" do
    sequence(:uid) { "csm_#{SecureRandom.hex[0..14]}" }
    name { "MyString" }
    description { "MyText" }
    website { "https://mystring.com/" }
    business_type { "B2B" }
  end
end
