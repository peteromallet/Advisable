import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { I18nextProvider } from "react-i18next";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import App from "../App";
import i18n from "./i18next.js";
import introspectionQueryResultData from "../fragmentTypes.json";
import "@testing-library/jest-dom/extend-expect";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const defaultConfig = {
  route: "/",
  graphQLMocks: [],
};

jest.mock("popper.js", () => {
  const PopperJS = jest.requireActual("popper.js");

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

jest.mock("talkjs", () => {
  class User {}
  class Session {
    getOrCreateConversation() {
      return {
        setParticipant: user => {},
      };
    }

    createChatbox(conversation) {
      return {
        mount: node => {},
      };
    }

    get unreads() {
      return {
        on: (event, handler) => {},
      };
    }
  }

  return {
    ready: Promise.resolve(),
    User: User,
    Session: Session,
  };
});

const renderApp = (config = defaultConfig) => {
  window.scrollTo = () => {};
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  });

  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(),
      clear: jest.fn(),
    },
  });

  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}

    observe() {
      return null;
    }

    unobserve() {
      return null;
    }
  };

  window.stripe = {
    elements: () => ({
      create: el => ({
        mount: node => {},
        unmount: () => {},
      }),
    }),
    handleCardPayment: () => Promise.resolve({ error: null }),
    handleCardSetup: (secret, card, details) =>
      Promise.resolve({ setupIntent: {} }),
  };

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
