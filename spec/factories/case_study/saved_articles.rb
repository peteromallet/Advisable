# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_saved_article, class: "CaseStudy::SavedArticle" do
    user
    article { association :case_study_article }
  end
end
