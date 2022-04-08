# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_interest_preview, class: "CaseStudy::InterestPreview" do
    sequence(:uid) { "csp_#{SecureRandom.hex[0..14]}" }
    term { "sad B2B content" }
    account
  end
end
