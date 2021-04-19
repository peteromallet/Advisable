# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_content, class: "CaseStudy::Content" do
    section { association :case_study_section }
    position { 1 }
  end

  factory :case_study_paragraph_content, parent: :case_study_content, class: "CaseStudy::ParagraphContent" do
    type { "paragraph" }
    content { {text: Faker::TvShows::TheITCrowd.quote} }
  end

  factory :case_study_heading_content, parent: :case_study_content, class: "CaseStudy::HeadingContent" do
    type { "heading" }
    content { {size: "h2", text: Faker::TvShows::TheITCrowd.quote} }
  end

  factory :case_study_results_content, parent: :case_study_content, class: "CaseStudy::ResultsContent" do
    type { "results" }
    content { { results: ["1", "2", "3"] } }
  end
end
