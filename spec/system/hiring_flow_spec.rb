# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Hiring flow", type: :system do
  let(:specialist) { create(:specialist) }
  let(:company) { create(:company, payments_setup: false) }
  let(:account) { create(:account, permissions: ["team_manager"]) }
  let(:user) { create(:user, company: company, account: account) }
  let(:project) { create(:project, user: user) }
  let(:application) { create(:application, project: project, specialist: specialist) }

  it "allows user to hire setup payments and hire the freelancer" do
    invoice_settings = OpenStruct.new(default_payment_method: nil)
    customer = OpenStruct.new(id: "cus_12345", invoice_settings: invoice_settings)

    allow(company).to receive(:stripe_customer).and_return(customer)

    authenticate_as(user)
    visit("/book/#{application.uid}")
    fill_in("cardholder", with: "John Doe")
    stripe_frame = find(".StripeElement iframe")
    within_frame(stripe_frame) do
      fill_in("cardnumber", with: "4242424242424242")
      fill_in("exp-date", with: "0125")
      fill_in("cvc", with: "123")
      fill_in("postal", with: "12345")
    end
    click_on("Continue")
    company.update(setup_intent_status: "succeeded")

    expect(Stripe::Customer).to receive(:update).with(company.stripe_customer_id, {
      name: "Test Corp",
      email: "billing@test.com"
    })
    expect(page).to have_content("Invoice settings")
    fill_in("companyName", with: "Test Corp")
    fill_in("billingEmail", with: "billing@test.com")
    fill_in("address.line1", with: "Bacon")
    fill_in("address.line2", with: "Eggs")
    fill_in("address.city", with: "Ham")
    fill_in("address.state", with: "Plate")
    click_on("Continue")

    choose("I accept these payment terms", allow_label_click: true)
    click_on("Continue")

    choose("Predefined Projects", allow_label_click: true)
    check("I accept", allow_label_click: true)
    click_on("Continue")

    expect(page).to have_content("No active projects")
  end
end
