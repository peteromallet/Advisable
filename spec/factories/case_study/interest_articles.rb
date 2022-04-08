# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_interest_article, class: "CaseStudy::InterestArticle" do
    interest { association :case_study_interest }
    article { association :case_study_article }
    similarity { rand(0.0..1.0) }
  end
end
