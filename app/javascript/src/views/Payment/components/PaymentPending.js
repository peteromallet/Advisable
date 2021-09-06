import React from "react";
import BankTransferPending from "./BankTransferPending";
import HandlePayment from "./HandlePayment";

export default function PaymentPending({ payment }) {
  if (payment.paymentMethod === "Bank Transfer") {
    return <BankTransferPending payment={payment} />;
  }

  return <HandlePayment payment={payment} />;
}
