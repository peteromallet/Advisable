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

    it "allows them to create a new article" do
      create(:specialist, account: create(:account, first_name: "Jim", last_name: "Halpert"))
      visit("/admin/articles")
      click_on("New Article")
      fill_in("case_study_article[title]", with: "This is the title")
      fill_in("case_study_article[subtitle]", with: "This is the subtitle")
      select("Jim Halpert", from: "case_study_article[specialist_id]")
      click_on("Create Article")
      expect(page).to have_content(/successfully created/i)
    end

    it "allows them to change company information" do
      fill_in("case_study_article[company_attributes][name]", with: "Changed", fill_options: {clear: :backspace})
      fill_in("case_study_article[company_attributes][website]", with: "https://advisable.com", fill_options: {clear: :backspace})
      click_on("Save Changes")
      expect(page).to have_content(/article was successfully updated/i)
      expect(article.reload.company.name).to eq("Changed")
      expect(article.reload.company.website).to eq("https://advisable.com")
    end

    it "allows them to add key take aways" do
      add_takeaways
    end

    it "allows them to add a skill" do
      add_skill
    end

    it "allows them to add an industry" do
      add_industry
    end

    it "allows them to edit a heading" do
      edit_heading
    end

    it "allows them to create a heading" do
      create_heading
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

    it "allows them to add key take aways" do
      add_takeaways
    end

    it "allows them to add a skill" do
      add_skill
    end

    it "allows them to add an industry" do
      add_industry
    end

    it "allows them to edit a heading" do
      edit_heading
    end

    it "allows them to create a heading" do
      create_heading
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

def edit_heading
  content = article.contents.find_by(type: "CaseStudy::HeadingContent")
  block = find_by_test_id(content.uid)
  block.hover
  within(block) do
    click_on("Edit")
    find_field("text").send_keys([:meta, "a"], "Updated")
    click_on("Save")
  end
  expect(page).to have_selector("h3", text: "Updated")
  expect(content.reload.text).to eq("Updated")
end

def create_heading
  new_content = find("#new_content_case_study_section_#{article.sections.first.id}")
  within(new_content) do
    click_button("Heading")
    find_field("text").send_keys("A new heading")
    click_on("Save")
    expect(page).not_to have_field("text")
  end
  content = article.contents.last
  expect(content).to be_instance_of(CaseStudy::HeadingContent)
  expect(content.text).to eq("A new heading")
end

def add_takeaways
  insights = find_by_test_id("insights")
  within(insights) do
    fill_in("case_study_insight[title]", with: "This is a takeaway")
    fill_in("case_study_insight[description]", with: "This is the description")
    click_on("Add")
  end
  expect(insights).to have_content("This is a takeaway")
  insight = article.insights.last
  expect(insight.title).to eq("This is a takeaway")
end

def edit_paragraph
  content = article.contents.find_by(type: "CaseStudy::ParagraphContent")
  block = find_by_test_id(content.uid)
  block.hover
  within(block) do
    click_on("Edit")
    find_field("text").send_keys([:meta, "a"], "Updated")
    click_on("Save")
  end
  expect(page).to have_selector("p", text: "Updated")
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
  expect(content).to be_instance_of(CaseStudy::ParagraphContent)
  expect(content.reload.text).to eq("A new paragraph")
end

def add_skill
  new_skill = create(:skill, name: "New skill", active: true)
  visit("/editor/#{article.id}")
  skills = find_by_test_id("skills")
  within(skills) do
    select("New skill", from: "case_study_skill[skill]")
    click_on("Add skill")
  end
  expect(page).to have_selector("p", text: "New skill")
  skill_ids = article.reload.skills.map(&:skill_id)
  expect(skill_ids).to include(new_skill.id)
end

def add_industry
  new_industry = create(:industry, name: "New industry")
  visit("/editor/#{article.id}")
  industries = find_by_test_id("industries")
  within(industries) do
    select("New industry", from: "case_study_industry[industry]")
    click_on("Add industry")
  end
  expect(page).to have_selector("p", text: "New industry")
  ids = article.reload.industries.map(&:industry_id)
  expect(ids).to include(new_industry.id)
end
