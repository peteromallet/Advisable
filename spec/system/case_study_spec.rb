# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Case study view", type: :system do
  let(:specialist) { create(:specialist, price_range: "medium") }
  let(:article) { create(:case_study_article, comment: "Comment string", specialist:) }
  let!(:background) { create(:case_study_section, type: "background", article:) }
  let!(:h1) { create(:case_study_heading_content, section: background) }
  let!(:p1) { create(:case_study_paragraph_content, section: background) }
  let!(:overview) { create(:case_study_section, type: "overview", article:) }
  let!(:h2) { create(:case_study_heading_content, section: overview) }
  let!(:p2) { create(:case_study_paragraph_content, section: overview) }
  let!(:outcome) { create(:case_study_section, type: "outcome", article:) }
  let!(:h3) { create(:case_study_heading_content, section: outcome) }
  let!(:p3) { create(:case_study_paragraph_content, section: outcome) }
  let!(:results_content) { create(:case_study_results_content, :with_category, section: outcome) }
  let!(:insight) { create(:case_study_insight, article:) }

  before do
    allow_any_instance_of(CaseStudy::Article).to receive(:similar).and_return([])
  end

  it "renders the case study" do
    visit("/articles/#{article.slug}")
    expect(page).to have_content(article.specialist.name)
    expect(page).to have_content(article.specialist.bio)
    expect(page).to have_content("$75 - $150")
    expect(page).to have_content("Hands-On Work, Consultations and Mentoring")
    expect(page).to have_content(article.title)
    expect(page).to have_content(h1.content["text"])
    expect(page).to have_content(p1.content["text"])
    expect(page).to have_content(h2.content["text"])
    expect(page).to have_content(p2.content["text"])
    expect(page).to have_content(h3.content["text"])
    expect(page).to have_content(p3.content["text"])
    expect(page).to have_content(/results/i)
    expect(page).to have_content(results_content.content["results"].first["callout"])
    expect(page).to have_content(results_content.content["results"].first["context"])
    expect(page).to have_content(results_content.content["results"].second["callout"])
    expect(page).to have_content(results_content.content["results"].second["context"])
    expect(page).to have_content(/key takeaways/i)
    expect(page).to have_content(insight.title)
    expect(page).to have_content(insight.description)
    expect(page).to have_content(/company details/i)
    expect(page).to have_content(article.company.name)
    expect(page).to have_link(article.company.name, href: article.company.website)
    expect(page).to have_content(article.company_type.first)
    expect(page).to have_content(article.company.business_type)
  end

  it "copy link to clipboard" do
    visit("/articles/#{article.slug}")
    expect(page).to have_content(article.title)
    click_button("Copy Link")
    expect(page).to have_content("Link copied!")
  end
end
