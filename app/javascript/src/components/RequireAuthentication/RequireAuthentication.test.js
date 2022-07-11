import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
      <Routes>
        <Route path="*" element={<LocationDisplay />} />
      </Routes>
      <Routes>
        {React.cloneElement(component)}
        <Route path="*" element={null} />
      </Routes>
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
    <Route
      path="/test"
      element={
        <RequireAuthentication>
          <View />
        </RequireAuthentication>
      }
    />,
  );

  await screen.findByText("Current: /login");
  await screen.findByText("From: /test");
});

test("Does not redirect authenticated viewer", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <Route
      path="/test"
      element={
        <RequireAuthentication>
          <View />
        </RequireAuthentication>
      }
    />,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("specialistOnly redirects clients to /", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <Route
      path="/test"
      element={
        <RequireAuthentication specialistOnly>
          <View />
        </RequireAuthentication>
      }
    />,
  );

  await screen.findByText("Current: /");
  await screen.findByText("From: none");
});

test("specialistOnly does not redirect specialists", async () => {
  renderTestCase(
    mockData.specialist(),
    "/test",
    <Route
      path="/test"
      element={
        <RequireAuthentication specialistOnly>
          <View />
        </RequireAuthentication>
      }
    />,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("clientOnly redirects specialist to /", async () => {
  renderTestCase(
    mockData.specialist(),
    "/test",
    <Route
      path="/test"
      element={
        <RequireAuthentication clientOnly>
          <View />
        </RequireAuthentication>
      }
    />,
  );

  await screen.findByText("Current: /");
  await screen.findByText("From: none");
});

test("clientOnly does not redirect user", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <Route
      path="/test"
      element={
        <RequireAuthentication clientOnly>
          <View />
        </RequireAuthentication>
      }
    />,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});
