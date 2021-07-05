# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_archived_article, class: "CaseStudy::ArchivedArticle" do
    user
    article { association :case_study_article }
  end
end
