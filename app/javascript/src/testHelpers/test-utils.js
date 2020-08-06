import React from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import i18n from "./i18next";
import App from "../App";
import createCache from "../apolloCache";

window.focus = jest.fn();

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
  const cache = createCache();

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

export function renderComponent(component, config = {}) {
  return render(
    <Providers
      route={config.route || "/"}
      graphQLMocks={config.graphQLMocks || []}
    >
      {React.cloneElement(component)}
    </Providers>,
  );
}

// re-export everything
export * from "@testing-library/react";
export * from "./apolloMocks";
export { default as user } from "@testing-library/user-event";
export { default as mockData } from "./mockData";
