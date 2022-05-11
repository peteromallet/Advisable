# frozen_string_literal: true
require "rails_helper"

RSpec.describe "Confirming an account as a user" do
  it "displays the account confirmed notification" do
    user = create(:user, account: create(:account, confirmed_at: nil))
    mail = double("mail")
    expect(mail).to receive(:deliver_later)
    allow(UserMailer).to receive(:confirm).and_return(mail)
    allow(Token).to receive(:new).and_return("test_token")
    user.send_confirmation_email
    visit "/confirm_account/test_token?email=#{user.account.email}"
    expect(page).to have_content("Your account has been confirmed")
  end

  it "allows the user to resend the confirmation email" do
    user = create(:user, account: create(:account, confirmed_at: nil, completed_tutorials: ["onboarding"]))
    authenticate_as(user)
    visit("/explore")
    expect(page).to have_content(/please confirm your account/i)
    click_on("Resend confirmation email")
    expect(page).to have_content(/confirmation email has been resent/i)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "confirm", "deliver_now", {args: [anything]})
  end
end

RSpec.describe "Confirming an account as a specialist" do
  it "displays the account confirmed notification" do
    specialist = create(:specialist, account: create(:account, confirmed_at: nil))
    mail = double("mail")
    expect(mail).to receive(:deliver_later)
    allow(SpecialistMailer).to receive(:confirm).and_return(mail)
    allow(Token).to receive(:new).and_return("test_token")
    specialist.send_confirmation_email
    visit "/confirm_account/test_token?email=#{specialist.account.email}"
    expect(page).to have_content("Your account has been confirmed")
  end

  it "allows the user to resend the confirmation email" do
    specialist = create(:specialist, account: create(:account, confirmed_at: nil))
    authenticate_as(specialist)
    visit("/")
    expect(page).to have_content(/please confirm your account/i)
    click_on("Resend confirmation email")
    expect(page).to have_content(/confirmation email has been resent/i)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "confirm", "deliver_now", {args: [anything]})
  end
end

RSpec.describe "Invalid confirmation token" do
  it "displays the failed confirmation notification" do
    specialist = create(:user, account: create(:account, confirmed_at: nil))
    mail = double("mail")
    expect(mail).to receive(:deliver_later)
    allow(UserMailer).to receive(:confirm).and_return(mail)
    specialist.send_confirmation_email
    visit "/confirm_account/test_token?email=#{specialist.account.email}"
    expect(page).to have_content("Failed to confirm your account")
  end
end
