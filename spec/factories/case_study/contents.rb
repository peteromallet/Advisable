# frozen_string_literal: true

FactoryBot.define do
  factory :case_study_content, class: "CaseStudy::Content" do
    sequence(:uid) { "csc_#{SecureRandom.hex[0..14]}" }
    section { association :case_study_section }
    position { 1 }
  end

  factory :case_study_paragraph_content, parent: :case_study_content, class: "CaseStudy::ParagraphContent" do
    type { "CaseStudy::ParagraphContent" }
    content { {text: Faker::TvShows::TheITCrowd.quote} }
  end

  factory :case_study_heading_content, parent: :case_study_content, class: "CaseStudy::HeadingContent" do
    type { "CaseStudy::HeadingContent" }
    content { {size: "h2", text: Faker::TvShows::TheITCrowd.quote} }
  end

  factory :case_study_results_content, parent: :case_study_content, class: "CaseStudy::ResultsContent" do
    type { "CaseStudy::ResultsContent" }
    content { {results: %w[1 2 3]} }
  end

  factory :case_study_images_content, parent: :case_study_content, class: "CaseStudy::ImagesContent" do
    type { "CaseStudy::ImagesContent" }
    content { {} }
  end
end
