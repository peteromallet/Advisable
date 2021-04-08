# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_content, class: 'CaseStudy::Content' do
    article { association :case_study_article }
    type { 1 }
    position { 1 }
    content { {title: "wat"} }
  end
end
