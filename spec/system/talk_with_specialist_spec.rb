# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Talk with specialist button", type: :system do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:article) { create(:case_study_article) }

  it "allows client to request a call" do
    authenticate_as(user)
    visit("/articles/#{article.slug}")
    click_button("Talk with specialist")
    expect(page).to have_content("Connect with #{article.specialist.first_name} to discuss your project and collaborate together.")
    find("*[aria-label=\"Free consultation\"]").click
    expect(page).to have_content("Request a call with #{article.specialist.first_name}")
    expect(page).to have_content("Please select at least 6 available times to continue")
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    expect(page).not_to have_content("Please select at least 6 available times to continue")
    click_button("Next")
    fill_in("message", with: "I would like to chat with you")
    click_button("Request call")
    expect(page).to have_content("Request sent")
    click_button("Okay")
  end

  it "allows client to send a message" do
    authenticate_as(user)
    visit("/articles/#{article.slug}")
    click_button("Talk with specialist")
    expect(page).to have_content("Connect with #{article.specialist.first_name} to discuss your project and collaborate together.")
    find("*[aria-label=\"Message\"]").click
    expect(page).to have_content("Connect with #{article.specialist.first_name} by sending them a message.")
    fill_in("message", with: "I wanna hire you")
    click_button("Send message")
    expect(page).to have_content("Message sent")
    click_button("Okay")
  end

  it "allows specialist to send a message" do
    authenticate_as(specialist)
    visit("/articles/#{article.slug}")
    click_button("Talk with specialist")
    expect(page).to have_content("Message #{article.specialist.first_name}")
    fill_in("message", with: "I wanna hire you")
    click_button("Send message")
    expect(page).to have_content("Message sent")
    click_button("Okay")
  end

  it "allows non authenticated user to sign up as a client and request a call" do
    visit("/articles/#{article.slug}")
    click_button("Talk with specialist")
    expect(page).to have_content("Connect with #{article.specialist.first_name} and thousands of other specialists")
    find("*[aria-label=\"Signup as a company\"]").click
    fill_in("firstName", with: "John")
    fill_in("lastName", with: "Baker")
    fill_in("email", with: "john.baker@advisable.com")
    fill_in("password", with: "testing123")
    fill_in("passwordConfirmation", with: "testing123")
    click_button("Create account")
    find("*[aria-label=\"Free consultation\"]").click
    expect(page).to have_content("Request a call with #{article.specialist.first_name}")
    expect(page).to have_content("Please select at least 6 available times to continue")
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    first("div[aria-selected=\"false\"]").click
    expect(page).not_to have_content("Please select at least 6 available times to continue")
    click_button("Next")
    fill_in("message", with: "I would like to chat with you")
    click_button("Request call")
    expect(page).to have_content("Request sent")
    click_button("Okay")
  end

  it "allows non authenticated user to sign up as a specialist and send a message" do
    visit("/articles/#{article.slug}")
    click_button("Talk with specialist")
    expect(page).to have_content("Connect with #{article.specialist.first_name} and thousands of other specialists")
    find("*[aria-label=\"Signup as a freelancer\"]").click
    fill_in("firstName", with: "John")
    fill_in("lastName", with: "Baker")
    fill_in("email", with: "john.baker@advisable.com")
    fill_in("password", with: "testing123")
    fill_in("passwordConfirmation", with: "testing123")
    click_button("Create account")
    expect(page).to have_content("Message #{article.specialist.first_name}")
    fill_in("message", with: "I wanna hire you")
    click_button("Send message")
    expect(page).to have_content("Message sent")
    click_button("Okay")
  end
end
