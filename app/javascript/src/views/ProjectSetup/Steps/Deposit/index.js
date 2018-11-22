import queryString from "query-string";
import { animated } from "react-spring";
import React, { useState, useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentDetails from "./PaymentDetails";
import PaymentPending from "./PaymentPending";

function Deposit({ transform, opacity, position, ...props }) {
  const [stripe, setStripe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect back to the terms step if the terms have not been accepted
    if (props.project.acceptedTerms === false) {
      return history.replaceState("terms");
    }

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
    <animated.div style={{ transform, opacity, position }}>
      <StripeProvider stripe={stripe}>
        <Elements>
          {source ? (
            <PaymentPending setError={setError} source={source} {...props} />
          ) : (
            <PaymentDetails setError={setError} error={error} {...props} />
          )}
        </Elements>
      </StripeProvider>
    </animated.div>
  );
}

export default Deposit;
