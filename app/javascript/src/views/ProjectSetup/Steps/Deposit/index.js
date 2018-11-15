import queryString from "query-string";
import React, { useState, useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentDetails from "./PaymentDetails";
import PaymentPending from "./PaymentPending";

function Deposit(props) {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY));
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY));
      });
    }
  }, []);

  const source = queryString.parse(props.location.search).source;

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        {source ? <PaymentPending source={source} {...props} /> : <PaymentDetails {...props} />}
      </Elements>
    </StripeProvider>
  );
}

export default Deposit;
