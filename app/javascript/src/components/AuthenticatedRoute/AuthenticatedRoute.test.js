import { cloneElement } from "react";
import { Route, useLocation } from "react-router-dom";
import { screen } from "@testing-library/react";
import { renderComponent, mockData, mockViewer } from "test-utils";
import AuthenticatedRoute from "./index";

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
      <Route path="*" component={LocationDisplay} />
      {cloneElement(component)}
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
    <AuthenticatedRoute path="/test" component={View} />,
  );

  await screen.findByText("Current: /login");
  await screen.findByText("From: /test");
});

test("Does not redirect authenticated viewer", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <AuthenticatedRoute path="/test" component={View} />,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("specialistOnly redirects clients to /", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <AuthenticatedRoute specialistOnly path="/test" component={View} />,
  );

  await screen.findByText("Current: /");
  await screen.findByText("From: none");
});

test("specialistOnly does not redirect specialists", async () => {
  renderTestCase(
    mockData.specialist(),
    "/test",
    <AuthenticatedRoute specialistOnly path="/test" component={View} />,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("clientOnly redirects specialist to /", async () => {
  renderTestCase(
    mockData.specialist(),
    "/test",
    <AuthenticatedRoute clientOnly path="/test" component={View} />,
  );

  await screen.findByText("Current: /");
  await screen.findByText("From: none");
});

test("clientOnly does not redirect user", async () => {
  renderTestCase(
    mockData.user(),
    "/test",
    <AuthenticatedRoute clientOnly path="/test" component={View} />,
  );

  await screen.findByText("Current: /test");
  await screen.findByText("From: none");
});

test("redirects specialists to signup if applicationStage is Started", async () => {
  renderTestCase(
    mockData.specialist({
      applicationStage: "Started",
    }),
    "/test",
    <AuthenticatedRoute path="/test" component={View} />,
  );

  await screen.findByText("Current: /freelancers/signup/preferences");
  await screen.findByText("From: none");
});

test("renders confirmation pending if account not confirmed", async () => {
  renderTestCase(
    mockData.specialist({
      confirmed: false,
    }),
    "/test",
    <AuthenticatedRoute path="/test" component={View} />,
  );

  await screen.findByText(/please confirm your account/i);
});
