import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { screen } from "@testing-library/react";
import { renderComponent, mockData, mockViewer } from "test-utils";
import RequireAuthentication from "./index";

function LocationDisplay() {
  const location = useLocation();
  const from = location.state?.from.pathname;

  return (
    <>
      <span>{`Current: ${location.pathname}`}</span>
      <span>{`From: ${from || "none"}`}</span>
    </>
  );
}

function renderTestCase(viewer, initialPath, component) {
  return renderComponent(
    <>
      <Switch>
        <Route path="*">
          <LocationDisplay />
        </Route>
      </Switch>
      {React.cloneElement(component)}
    </>,
    {
      route: initialPath,
      graphQLMocks: [mockViewer(viewer)],
    },
  );
}

function View() {
  return <>view</>;
}

test("Redirects unauthenticated viewer to login", async () => {
  renderTestCase(
    null,
    "/test",
    <Route path="/test">
      <RequireAuthentication>
        <View />
      </RequireAuthentication>
    </Route>,
  );

  await screen.findByText("Current: /login");
  await screen.findByText("From: /test");
});

test("Does not redirect authenticated viewer", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <Route path="/test">
      <RequireAuthentication>
        <View />
      </RequireAuthentication>
    </Route>,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("specialistOnly redirects clients to /", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <Route path="/test">
      <RequireAuthentication specialistOnly>
        <View />
      </RequireAuthentication>
    </Route>,
  );

  await screen.findByText("Current: /");
  await screen.findByText("From: none");
});

test("specialistOnly does not redirect specialists", async () => {
  renderTestCase(
    mockData.specialist(),
    "/test",
    <Route path="/test">
      <RequireAuthentication specialistOnly>
        <View />
      </RequireAuthentication>
    </Route>,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("clientOnly redirects specialist to /", async () => {
  renderTestCase(
    mockData.specialist(),
    "/test",
    <Route path="/test">
      <RequireAuthentication clientOnly>
        <View />
      </RequireAuthentication>
    </Route>,
  );

  await screen.findByText("Current: /");
  await screen.findByText("From: none");
});

test("clientOnly does not redirect user", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <Route path="/test">
      <RequireAuthentication clientOnly>
        <View />
      </RequireAuthentication>
    </Route>,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});
