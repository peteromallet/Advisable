require "rails_helper"

describe Payments::Failed do
  it "Sets the payment status to failed" do
    payment = create(:payment, status: "pending")
    expect {
      Payments::Failed.call(payment, "card_declined")
    }.to change { payment.reload.status }.from("pending").to("failed")
  end

  it "Sets the decline_code" do
    payment = create(:payment, status: "pending", error_code: nil)
    expect {
      Payments::Failed.call(payment, "card_declined")
    }.to change { payment.reload.error_code }.from(nil).to("card_declined")
  end

  it "Throws an error if the payment is not pending" do
    payment = create(:payment, error_code: nil)
    expect {
      Payments::Failed.call(payment, "card_declined")
    }.to raise_error(Service::Error, "Payment is not pending")
  end
end