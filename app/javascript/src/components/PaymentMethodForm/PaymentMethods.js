import React from "react";
import stripe from "./assets/stripe.svg";
import methods from "./assets/paymentMethods.png";

export default function PaymentMethods() {
  return (
    <div className="text-neutral600 flex">
      <img className="h-[28px] mr-2" src={methods} />
      <img className="h-[28px] opacity-40" src={stripe} />
    </div>
  );
}
