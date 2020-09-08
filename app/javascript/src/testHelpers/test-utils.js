import React from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import useBreakpoints from "../../../../donut/src/hooks/useBreakpoints";
import { MockedProvider } from "@apollo/client/testing";
import i18n from "./i18next";
import App from "../App";
import createCache from "../apolloCache";

window.focus = jest.fn();

jest.mock("../../../../donut/src/hooks/useBreakpoints", () => jest.fn());

const BREAKPOINTS = ["sUp", "mUp", "lUp", "xlUp"];
beforeEach(() => {
  useBreakpoints.mockReturnValue({
    sUp: false,
    mUp: false,
    lUp: false,
    xlUp: false,
  });
});

export function mockBreakpoint(size) {
  const index = BREAKPOINTS.indexOf(size);
  const activeSizes = BREAKPOINTS.slice(0, index + 1);
  useBreakpoints.mockReturnValue({
    sUp: activeSizes.includes("sUp"),
    mUp: activeSizes.includes("mUp"),
    lUp: activeSizes.includes("lUp"),
    xlUp: activeSizes.includes("xlUp"),
  });
}

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

Element.prototype.scrollTo = () => {};

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}

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
      <MockedProvider
        mocks={graphQLMocks}
        cache={cache}
        defaultOptions={{
          mutate: {
            errorPolicy: "all",
          },
        }}
      >
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
