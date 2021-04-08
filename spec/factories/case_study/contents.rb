# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_content, class: 'CaseStudy::Content' do
    section { association :case_study_section }
    type { "" }
    position { 1 }
    content { {title: "wat"} }
  end
end
