# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_article_feedback, class: 'CaseStudy::ArticleFeedback' do
    article { association :case_study_article }
    skill { association :case_study_skill }
    feedback { "This skill isn't appropriate" }
  end
end
