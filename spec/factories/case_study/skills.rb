# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_skill, class: 'CaseStudy::Skill' do
    primary { false }
    article { association :case_study_article }
    skill
  end
end
