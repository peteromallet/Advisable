# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_insight, class: "CaseStudy::Insight" do
    sequence(:uid) { "csn_#{SecureRandom.hex[0..14]}" }
    article { association :case_study_article }
    title { "Super relevant" }
    description { "Some description why this is relevant" }
  end
end
