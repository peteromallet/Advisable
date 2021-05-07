# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_search, class: "CaseStudy::Search" do
    sequence(:uid) { "csr_#{SecureRandom.hex[0..14]}" }
    name { "It's a search" }
    business_type { "B2B" }
    goals { ["first goal", "second goal"] }
  end
end
