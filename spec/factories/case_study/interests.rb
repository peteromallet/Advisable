# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_interest, class: "CaseStudy::Interest" do
    sequence(:uid) { "cst_#{SecureRandom.hex[0..14]}" }
    term { "funny B2B content" }
    account
  end
end
