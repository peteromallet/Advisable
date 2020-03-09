import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from "./graphqlClient";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

import "./i18n";
import App from "./App";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
