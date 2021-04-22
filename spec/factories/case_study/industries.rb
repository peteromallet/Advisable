# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_industry, class: 'CaseStudy::Industry' do
    sequence(:uid) { "csi_#{SecureRandom.hex[0..14]}" }
    article { association :case_study_article }
    industry
  end
end
