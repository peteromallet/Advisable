import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphqlClient";

const keys = JSON.parse(document.getElementById("keys").dataset.value);
const stripePromise = loadStripe(keys.stripePublicKey);

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
