# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_section, class: 'CaseStudy::Section' do
    sequence(:uid) { "css_#{SecureRandom.hex[0..14]}" }
    article { association :case_study_article }
    type { "" }
  end
end
