import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import "./reset.css.js";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "/graphql",
  fetchOptions: {
    credentials: "same-origin"
  },
  request: operation => {
    const csrfToken = document
      .querySelector("meta[name=csrf-token]")
      .getAttribute("content");
    operation.setContext({
      headers: { "X-CSRF-Token": csrfToken }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
