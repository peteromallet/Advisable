# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Case study view", type: :system do
  let(:specialist) { create(:specialist) }
  let(:article) { create(:case_study_article, comment: "Comment string") }
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

  before do
    allow_any_instance_of(CaseStudy::Article).to receive(:similar).and_return([])
  end

  it "renders the case study" do
    visit("/articles/#{article.slug}")
    expect(page).to have_content(article.title)
    expect(page).to have_content("Advisable's comment")
    expect(page).to have_content("Comment string")
    expect(page).to have_content(h1.content["text"])
    expect(page).to have_content(p1.content["text"])
    expect(page).to have_content(h2.content["text"])
    expect(page).to have_content(p2.content["text"])
    expect(page).to have_content(h3.content["text"])
    expect(page).to have_content(p3.content["text"])
    expect(page).to have_content(results.content["results"].first)
  end

  it "renders testimonial request if specialist and no review" do
    authenticate_as(specialist)
    visit("/articles/#{article.slug}")
    expect(page).to have_content(/verify this project/i)
    expect(page).to have_content(/send this link to the client/i)
    click_button("copy url")
    expect(page).to have_content(/copied to clipboard/i)
  end

  it "copy link to clipboard" do
    visit("/articles/#{article.slug}")
    expect(page).to have_content(article.title)
    click_button("Copy Link")
    expect(page).to have_content("Link copied!")
  end

  context "when review exists" do
    before do
      create(:review, case_study_article: article, comment: "comment", company_name: "Advisable", first_name: "David", last_name: "Bowie")
    end

    it "displays review" do
      visit("/articles/#{article.slug}")
      expect(page).to have_content("David Bowie")
      expect(page).to have_content("comment")
      expect(page).to have_content("Advisable")
    end
  end
end
