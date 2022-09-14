# frozen_string_literal: true

require "rails_helper"

RSpec.describe "editor", type: :system do
  let(:article) { create(:case_study_article, :with_content, score: 80) }

  context "when logged in as an admin" do
    let(:admin) { create(:user, :admin) }

    before do
      authenticate_as(admin)
      visit("/editor/#{article.id}")
    end

    it "allows them to change the basic information" do
      new_published_date = article.published_at - 2.days
      expect(article.reload.title).not_to eq("Updated")
      expect(article.reload.subtitle).not_to eq("Changed subtitle")
      expect(article.reload.score).not_to eq(90)
      expect(article.reload.published_at.to_date).not_to eq(new_published_date.to_date)
      fill_in("case_study_article[title]", with: "Updated", fill_options: {clear: :backspace})
      fill_in("case_study_article[subtitle]", with: "Changed subtitle", fill_options: {clear: :backspace})
      fill_in("case_study_article[score]", with: "90", fill_options: {clear: :backspace})
      find_field("case_study_article[published_at]").send_keys(new_published_date.strftime("%d%m%Y"))
      check("case_study_article[hide_from_search]")
      click_on("Save Changes")
      expect(page).to have_content(/article was successfully updated/i)
      expect(article.reload.title).to eq("Updated")
      expect(article.reload.subtitle).to eq("Changed subtitle")
      expect(article.reload.score).to eq(90)
      expect(article.reload.published_at.to_date).to eq(new_published_date.to_date)
      expect(article.reload.hide_from_search).to be_truthy
    end

    it "allows them to edit a paragraph" do
      edit_paragraph
    end

    it "allows them to add a new paragraph" do
      create_paragraph
    end
  end

  context "when logged in as the author" do
    before do
      authenticate_as(article.specialist)
      visit("/editor/#{article.id}")
    end

    it "allows admin to change the basic information" do
      expect(article.reload.title).not_to eq("Updated")
      expect(article.reload.subtitle).not_to eq("Changed subtitle")
      fill_in("case_study_article[title]", with: "Updated", fill_options: {clear: :backspace})
      fill_in("case_study_article[subtitle]", with: "Changed subtitle", fill_options: {clear: :backspace})
      click_on("Save Changes")
      expect(page).to have_content(/article was successfully updated/i)
      expect(article.reload.title).to eq("Updated")
      expect(article.reload.subtitle).to eq("Changed subtitle")
    end

    it "allows them to edit a paragraph" do
      edit_paragraph
    end

    it "allows them to add a new paragraph" do
      create_paragraph
    end
  end

  context "when logged in as someone other than admin or author" do
    it "redirects to root" do
      specialist = create(:specialist)
      authenticate_as(specialist)
      visit("/editor/#{article.id}")
      expect(page).to have_current_path("/")
    end
  end
end

def edit_paragraph
  content = article.contents.find_by(type: "CaseStudy::ParagraphContent")
  block = find_by_test_id(content.uid)
  block.hover
  within(block) do
    click_on("Edit")
    find_field("text").send_keys([:meta, "a"], "Updated")
    click_on("Save")
    expect(block).to have_link("Edit")
  end
  expect(content.reload.text).to eq("Updated")
end

def create_paragraph
  new_content = find("#new_content_case_study_section_#{article.sections.first.id}")
  within(new_content) do
    click_button("Paragraph")
    find_field("text").send_keys("A new paragraph")
    click_on("Save")
    expect(page).not_to have_field("text")
  end
  content = article.contents.last
  expect(content.reload.text).to eq("A new paragraph")
end
