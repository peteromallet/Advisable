# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_article, class: 'CaseStudy::Article' do
    sequence(:uid) { "csa_#{SecureRandom.hex[0..14]}" }
    score { 1 }
    company { association :case_study_company }
    confidential { false }
    title { Faker::Lorem.sentence }
    subtitle { Faker::Lorem.paragraph(sentence_count: 4) }
    comment { "MyString" }
    excerpt { "MyString" }
    published_at { "2021-04-07 15:36:48" }
    specialist
    interviewer { association :account }
    editor { association :account }

    trait :with_skills do
      skills { [association(:case_study_skill), association(:case_study_skill)] }
    end
  end
end
