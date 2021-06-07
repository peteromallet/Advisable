# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_shared_article, class: 'CaseStudy::SharedArticle' do
    article { association :case_study_article }
    shared_by { association :user }
    shared_with { association :user }
    message { "I like this. You might like this." }
  end
end
