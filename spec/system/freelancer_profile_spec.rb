# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Freelancer profile", type: :system do
  it "allows freelancer to update their bio" do
    specialist = create(:specialist, bio: "testing")
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    authenticate_as(specialist)
    visit "/freelancers/#{specialist.uid}"
    click_on "Edit Info"
    fill_in "bio", with: "This is the bio, testing 123"
    click_on "Update"
    expect(page).to have_content("Your profile has been updated")
  end

  it "loads profile from username" do
    specialist = create(:specialist, username: "testing")
    visit "/freelancers/#{specialist.username}"
    expect(page).to have_content(specialist.account.name)
  end

  it "loads a 404 page when given an incorrect UID" do
    visit "/freelancers/nope"
    expect(page).to have_content("404")
  end

  it "allows user to click into a case study" do
    specialist = create(:specialist, bio: "testing")
    article = create(:case_study_article, specialist: specialist, title: "A test case study")
    section = create(:case_study_section, article: article, type: "background")
    create(:case_study_content, section: section, type: "CaseStudy::ParagraphContent", content: {text: "This is the content"})
    visit("/freelancers/#{specialist.uid}")
    click_link("A test case study")
    expect(page).to have_content("This is the content")
  end

  it "allows owner to edit case study" do
    specialist = create(:specialist, bio: "testing")
    article = create(:case_study_article, specialist: specialist, title: "A test case study", editor_url: "https://advisable.com")
    section = create(:case_study_section, article: article, type: "background")
    create(:case_study_content, section: section, type: "CaseStudy::ParagraphContent", content: {text: "This is the content"})
    authenticate_as(specialist)
    visit("/freelancers/#{specialist.uid}")
    expect(page).to have_content("A test case study")
    first("*[data-testid='caseStudyCard']").hover
    first(:button, "Case study menu").hover
    click_button("Edit case study")
    expect(page).to have_content("Open editor")
  end

  it "prompts the profile owner to add case studies when they have none" do
    specialist = create(:specialist, bio: "testing")
    authenticate_as(specialist)
    visit("/freelancers/#{specialist.uid}")
    expect(page).to have_content("Add your first case study!")
  end

  it "doesn't prompt about adding case studies unless the viewer is the owner" do
    user = create(:user)
    specialist = create(:specialist, bio: "testing")
    authenticate_as(user)
    visit("/freelancers/#{specialist.uid}")
    expect(page).to have_content(specialist.account.name)
    expect(page).not_to have_content("Add your first case study!")
  end

  it "prompts the profile owner to collect reviews when they have no reviews" do
    specialist = create(:specialist, bio: "testing")
    authenticate_as(specialist)
    visit("/freelancers/#{specialist.uid}")
    expect(page).to have_content("Request testimonials from a client!")
  end

  it "doesn't prompt about collecting reviews unless the viewer is the owner" do
    user = create(:user)
    specialist = create(:specialist, bio: "testing")
    authenticate_as(user)
    visit("/freelancers/#{specialist.uid}")
    expect(page).to have_content(specialist.account.name)
    expect(page).not_to have_content("Request testimonials from a client!")
  end

  it "shows an empty profile state when the user has no case studies or reviews" do
    specialist = create(:specialist, bio: "testing")
    visit("/freelancers/#{specialist.uid}")
    expect(page).to have_content("It looks like #{specialist.account.first_name} hasn't added any projects")
  end
end
