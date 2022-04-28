# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Case sutdy view", type: :system do
  let(:article) { create(:case_study_article) }
  let!(:background) { create(:case_study_section, type: "overview", article:) }
  let!(:h1) { create(:case_study_heading_content, section: background) }
  let!(:p1) { create(:case_study_paragraph_content, section: background) }
  let!(:overview) { create(:case_study_section, type: "overview", article:) }
  let!(:h2) { create(:case_study_heading_content, section: overview) }
  let!(:p2) { create(:case_study_paragraph_content, section: overview) }
  let!(:outcome) { create(:case_study_section, type: "outcome", article:) }
  let!(:h3) { create(:case_study_heading_content, section: outcome) }
  let!(:p3) { create(:case_study_paragraph_content, section: outcome) }
  let!(:results) { create(:case_study_results_content, section: outcome) }

  it "renders the case study" do
    visit("/articles/#{article.slug}")
    expect(page).to have_content(article.title)
    expect(page).to have_content(h1.content["text"])
    expect(page).to have_content(p1.content["text"])
    expect(page).to have_content(h2.content["text"])
    expect(page).to have_content(p2.content["text"])
    expect(page).to have_content(h3.content["text"])
    expect(page).to have_content(p3.content["text"])
    expect(page).to have_content(results.content["results"].first)
  end
end
