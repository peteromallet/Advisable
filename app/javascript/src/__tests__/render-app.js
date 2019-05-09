import renderApp from "../testHelpers/renderApp";
import { cleanup } from "react-testing-library";
import viewer from "../__mocks__/graphql/queries/viewer";

afterEach(cleanup);

test("Renders without crashing", () => {
  renderApp({
    route: "/",
    graphQLMocks: [viewer.asClient()],
  });
});
