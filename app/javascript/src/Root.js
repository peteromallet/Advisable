import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Editmode } from 'editmode-react'
import client from "./graphqlClient";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

import "./i18n";
import App from "./App";

const Root = () => {
  return (
    <Editmode projectId="prj_uD1zxmMqBe1v">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </ApolloProvider>
    </Editmode>
  );
};

export default Root;
