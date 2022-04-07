# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_favorited_article, class: "CaseStudy::FavoritedArticle" do
    account
    article { association :case_study_article }
  end
end
