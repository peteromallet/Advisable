# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_topic, class: "CaseStudy::Topic" do
    sequence(:uid) { "cst_#{SecureRandom.hex[0..14]}" }
    name { "Sad B2B" }
    hidden { false }
    description { "Some description why B2B is sad" }
    result_ids { [] }
  end
end
