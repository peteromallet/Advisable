import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { I18nextProvider } from "react-i18next";
import { render } from "@testing-library/react";
import { Elements } from "@stripe/react-stripe-js";
import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";
import i18n from "./i18next.js";

const defaultConfig = {
  route: "/",
  graphQLMocks: [],
};

window.focus = jest.fn();

jest.mock("talkjs", () => {
  class User {}
  class Session {
    getOrCreateConversation() {
      return {
        setParticipant: (user) => {},
      };
    }

    createChatbox(conversation) {
      return {
        mount: (node) => {},
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

export const mockElement = () => ({
  mount: jest.fn(),
  destroy: jest.fn(),
  on: jest.fn(),
  update: jest.fn(),
});

export const mockElements = () => {
  const elements = {};
  return {
    create: jest.fn((type) => {
      elements[type] = mockElement();
      return elements[type];
    }),
    getElement: jest.fn((type) => {
      return elements[type] || null;
    }),
  };
};

export const mockStripe = () => ({
  elements: jest.fn(() => mockElements()),
  createToken: jest.fn(),
  createSource: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  paymentRequest: jest.fn(),
  handleCardPayment: () => Promise.resolve({ error: null }),
  handleCardSetup: (secret, card, details) =>
    Promise.resolve({ setupIntent: {} }),
});

const renderApp = (config = defaultConfig) => {
  return renderComponent(<App />, config);
};

export const renderComponent = (component, config = {}) => {
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
      removeItem: jest.fn(),
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

    disconnect() {
      return null;
    }
  };

  const history = createMemoryHistory({ initialEntries: [config.route] });
  const cache = new InMemoryCache({
    possibleTypes: {
      ViewerUnion: ["User", "Specialist"],
    },
  });

  return {
    ...render(
      <MockedProvider mocks={config.graphQLMocks} cache={cache}>
        <Router history={history}>
          <Elements stripe={mockStripe()}>
            <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
          </Elements>
        </Router>
      </MockedProvider>,
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

export default renderApp;
