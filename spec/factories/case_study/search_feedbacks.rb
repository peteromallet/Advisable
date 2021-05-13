# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_search_feedback, class: 'CaseStudy::SearchFeedback' do
    search { association :case_study_search }
    article { association :case_study_article }
    feedback { "MyText" }
  end
end
