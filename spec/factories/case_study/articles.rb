# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_article, class: "CaseStudy::Article" do
    sequence(:uid) { "csa_#{SecureRandom.hex[0..14]}" }
    score { 80 }
    company { association :case_study_company }
    confidential { false }
    sequence(:title) { |s| "#{Faker::Lorem.sentence} #{s}" }
    subtitle { Faker::Lorem.paragraph(sentence_count: 4) }
    comment { "MyString" }
    excerpt { "MyString" }
    published_at { "2021-04-07 15:36:48" }
    specialist
    interviewer { association :account }
    editor { association :account }
    company_type { ["Growth-Stage Startup"] }

    trait :with_skills do
      skills { [association(:case_study_skill, primary: true), association(:case_study_skill)] }
    end

    trait :with_content do
      after(:create) do |article|
        section = create(:case_study_section, article:)
        create(:case_study_heading_content, section:, position: 0)
        create(:case_study_paragraph_content, section:, position: 1)
        create(:case_study_results_content, section:, position: 2)
      end
    end
  end
end
