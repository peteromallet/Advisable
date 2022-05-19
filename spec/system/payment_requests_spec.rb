# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Payment requests", type: :system do
  let(:company) { create(:company) }
  let(:user) { create(:user, company:) }
  let(:specialist) { create(:specialist) }
  let(:status) { "pending" }
  let(:payment_request) { create(:payment_request, specialist:, status:, company:) }
  let(:payment_intent) do
    Stripe::PaymentIntent.create(
      currency: "usd",
      amount: payment_request.amount,
      setup_future_usage: "off_session"
    )
  end

  before do
    allow_any_instance_of(Payment).to receive(:pdf_url).and_return("https://example.com")
    allow(Stripe::PaymentIntent).to receive(:retrieve).and_return(payment_intent)
  end

  context "when not logged in" do
    it "redirects to login" do
      visit("/payment_requests")
      expect(page).to have_content("Welcome Back!")
    end
  end

  it "shows message when trying to create a request with no active agreements" do
    authenticate_as(specialist)
    visit("/payment_requests/new")
    expect(page).to have_content("No active clients")
  end

  it "allows freelancer to create a new payment request" do
    create(:agreement, specialist:, user:, status: "accepted")
    authenticate_as(specialist)
    visit("/payment_requests/new")
    dropdown = find_field("Select client")
    dropdown.send_keys(:down, :enter)
    fill_in("lineItems[0].description", with: "Testing")
    fill_in("lineItems[0].amount", with: "100")
    click_button("Add item")
    fill_in("lineItems[1].description", with: "Testing Two")
    fill_in("lineItems[1].amount", with: "500")
    fill_in("memo", with: "This is a memo")
    click_button("Send request")
    within("*[data-dialog]") do
      click_button("Send request")
    end
    expect(page).to have_content("This request is awaiting payment")
  end

  context "when status is 'pending'" do
    context "with the specialist logged in" do
      before { authenticate_as(specialist) }

      it "informs them the payment is pending" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("This request is awaiting payment")
      end

      it "allows them to cancel the request" do
        visit("/payment_requests/#{payment_request.uid}")
        click_button("Cancel request")
        within("*[role='dialog']") do
          fill_in("reason", with: "Because")
          click_button("Submit")
        end
        expect(page).to have_content("This request has been canceled")
      end
    end

    context "with the user logged in" do
      before { authenticate_as(user) }

      it "allows them to approve and pay the request" do
        user.company.update!(stripe_payment_method: "asdf1234")
        allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_123asdf456", status: "succeeded"))
        visit("/payment_requests/#{payment_request.uid}")
        click_button("Approve & Pay")
        expect(page).to have_content("request has been paid")
      end

      it "falls back to approved state if payment fails" do
        allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_123asdf456", status: "requires_payment_method"))
        visit("/payment_requests/#{payment_request.uid}")
        click_button("Approve & Pay")
        expect(page).to have_content("Cardholder Name")
      end

      it "allows them to dispute the payment request" do
        visit("/payment_requests/#{payment_request.uid}")
        click_on("Dispute request")
        fill_in("reason", with: "Because")
        click_on("Submit")
        expect(page).to have_content("This request was disputed")
      end
    end
  end

  context "when status is 'approved'" do
    let(:status) { "approved" }

    before do
      create(:payment, payment_request:, company:, specialist:, status: "requires_payment_method")
    end

    context "with specialist logged in" do
      before { authenticate_as(specialist) }

      it "informs them we are awaiting payment" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("we are waiting to receive their payment.")
      end
    end

    context "with the user logged in" do
      before do
        StripeMock.start
        authenticate_as(user)
      end

      after { StripeMock.stop }

      it "allows them to pay via card" do
        visit("/payment_requests/#{payment_request.uid}")
        fill_in("cardholder", with: "Michael Scott")
        frame = find(".StripeElement iframe")
        within_frame(frame) do
          fill_in("cardnumber", with: "4242424242424242")
          fill_in("exp-date", with: "04/24")
          fill_in("cvc", with: "242")
          fill_in("postal", with: "11111")
        end
        click_button("Complete Payment")
        expect(page).to have_content("request has been paid")
      end
    end
  end

  context "when status is 'disputed'" do
    let(:status) { "disputed" }

    context "with the specialist logged in" do
      before { authenticate_as(specialist) }

      it "informs them it's been disputed" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("This request was disputed")
      end
    end

    context "with the user logged in" do
      before { authenticate_as(user) }

      it "informs them it's been disputed" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("This request was disputed")
      end
    end
  end

  context "when status is 'paid'" do
    let(:status) { "paid" }

    before do
      create(:payment, payment_request:, company:, specialist:)
    end

    context "with the specialist logged in" do
      before { authenticate_as(specialist) }

      it "informs them it's been paid" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("This request has been paid")
      end
    end

    context "with the user logged in" do
      before { authenticate_as(user) }

      it "informs them it's been paid and provides download for invoice" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("request has been paid")
        expect(page).to have_content("Download invoice")
      end
    end
  end

  context "when status is 'canceled'" do
    let(:status) { "canceled" }

    context "with the specialist logged in" do
      before { authenticate_as(specialist) }

      it "informs them it's been canceled" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("This request has been canceled")
      end
    end

    context "with the user logged in" do
      before { authenticate_as(user) }

      it "informs them it's been canceled" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("This request has been canceled")
      end
    end
  end

  context "when status is 'paid_out'" do
    let(:status) { "paid_out" }

    context "with the specialist logged in" do
      before { authenticate_as(specialist) }

      it "informs them it's been paid_out" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("transferred the funds")
      end
    end

    context "with the user logged in" do
      before { authenticate_as(user) }

      it "informs them it's been canceled" do
        visit("/payment_requests/#{payment_request.uid}")
        expect(page).to have_content("has been transferred to")
      end
    end
  end
end
