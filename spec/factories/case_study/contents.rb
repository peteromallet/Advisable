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
    content { {results: ["Successful company rebranding and repositioning with full acceptance inside and out", "Changed strategy, methodology, mindset & vision to fit a SaaS company"]} }

    trait :with_category do
      content do
        {results: [
          {category: "Big Win", context: "Successful company rebranding and repositioning with full acceptance inside and out", callout: "Successful rebranding"},
          {category: "Adjusted Strategy", context: "Changed strategy, methodology, mindset & vision to fit a SaaS company", callout: "Changed strategy, methodology, mindset & vision"}
        ]}
      end
    end
  end

  factory :case_study_links_content, parent: :case_study_content, class: "CaseStudy::LinksContent" do
    type { "CaseStudy::LinksContent" }
    content { {links: [Faker::TvShows::SiliconValley.url, Faker::TvShows::SiliconValley.url]} }
  end

  factory :case_study_images_content, parent: :case_study_content, class: "CaseStudy::ImagesContent" do
    type { "CaseStudy::ImagesContent" }
    content { {} }
  end
end
