# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_interest_article, class: "CaseStudy::InterestArticle" do
    interest { association :case_study_interest }
    article { association :case_study_article }
    score { rand(1..100) }
  end
end
