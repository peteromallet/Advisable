import React from "react";
import * as Sentry from "@sentry/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphqlClient";

const keys = JSON.parse(document.getElementById("keys").dataset.value);
const stripePromise = loadStripe(keys.stripePublicKey);

import "./i18n";
import App from "./App";

const Root = ({ history }) => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Router>
    </ApolloProvider>
  );
};

export default Sentry.withProfiler(Root);
