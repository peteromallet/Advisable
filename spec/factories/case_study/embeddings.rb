# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_embedding, class: "CaseStudy::Embedding" do
    article { association :case_study_article }
    engine { "babbage" }
  end
end
