import { renderRoute, mockViewer } from "test-utils";
import GET_PROJECT from "./fetchProject";

test("redirecs to login if authenticationRequired", async () => {
  const app = renderRoute({
    route: `/project_setup/12345`,
    graphQLMocks: [
      mockViewer(null),
      {
        request: {
          query: GET_PROJECT,
          variables: { id: "12345" },
        },
        result: {
          data: null,
          errors: [
            {
              extensions: {
                code: "authenticationRequired",
              },
            },
          ],
        },
      },
    ],
  });

  const heading = await app.findByText(/Welcome back/i);
  expect(heading).toBeInTheDocument();
});
