import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { I18nextProvider } from "react-i18next";
import { render } from "react-testing-library";
import { MockedProvider } from "react-apollo/test-utils";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import App from "../App";
import i18n from "./i18next.js";
import introspectionQueryResultData from "../fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const defaultConfig = {
  route: "/",
  graphQLMocks: [],
};

const renderApp = (config = defaultConfig) => {
  window.scrollTo = () => {};
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  });
  localStorage.setItem("authToken", "token");

  const history = createMemoryHistory({ initialEntries: [config.route] });
  const cache = new InMemoryCache({ fragmentMatcher });

  return {
    ...render(
      <MockedProvider mocks={config.graphQLMocks} cache={cache}>
        <Router history={history}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Router>
      </MockedProvider>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

export default renderApp;
