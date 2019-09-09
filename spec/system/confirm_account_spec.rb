require "rails_helper"

describe "Confirming an account as a user" do
  it "displays the account confirmed notification" do
    user = create(:user, confirmed_at: nil)
    mail = double("mail")
    expect(mail).to receive(:deliver_later)
    allow(AccountMailer).to receive(:confirm).and_return(mail)
    allow(Token).to receive(:new).and_return("test_token")
    user.send_confirmation_email
    visit "/confirm_account/test_token?email=#{user.email}"
    expect(page).to have_content("Your account has been confirmed")
  end
end


describe "Invalid confirmation token" do
  it "displays the failed confirmation notification" do
    specialist = create(:user, confirmed_at: nil)
    mail = double("mail")
    expect(mail).to receive(:deliver_later)
    allow(AccountMailer).to receive(:confirm).and_return(mail)
    specialist.send_confirmation_email
    visit "/confirm_account/test_token?email=#{specialist.email}"
    expect(page).to have_content("Failed to confirm your account")
  end
end