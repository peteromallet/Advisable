# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_article, class: 'CaseStudy::Article' do
    sequence(:uid) { "csa_#{SecureRandom.hex[0..14]}" }
    score { 1 }
    company { association :case_study_company }
    confidential { false }
    title { "MyString" }
    subtitle { "MyString" }
    comment { "MyString" }
    excerpt { "MyString" }
    published_at { "2021-04-07 15:36:48" }
    specialist
    interviewer { association :account }
    editor { association :account }
  end
end
