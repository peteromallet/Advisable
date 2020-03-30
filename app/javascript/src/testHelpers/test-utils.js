import React from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import i18n from "./i18next";
import App from "../App";
import introspectionQueryResultData from "../fragmentTypes.json";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: false,
  value: jest.fn(),
});

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

function Providers({ children, route, graphQLMocks }) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  const cache = new InMemoryCache({ fragmentMatcher });

  return (
    <I18nextProvider i18n={i18n}>
      <MockedProvider mocks={graphQLMocks} cache={cache}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </MockedProvider>
    </I18nextProvider>
  );
}

export function renderRoute(config) {
  return render(
    <Providers route={config.route} graphQLMocks={config.graphQLMocks}>
      <App />
    </Providers>,
  );
}

// re-export everything
export * from "@testing-library/react";
