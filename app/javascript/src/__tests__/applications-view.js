import { renderRoute } from "test-utils";
import { mockViewer, mockQuery } from "apolloMocks";
import generateTypes from "../__mocks__/graphqlFields";
import getApplications from "../views/Project/fetchProject";

test("Can view Applied applications", async () => {
  const app = renderRoute({
    route: "/projects/rec1234/applied",
    graphQLMocks: [
      mockViewer(generateTypes.user()),
      mockQuery(
        getApplications,
        { id: "rec1234" },
        {
          project: generateTypes.project({
            id: "rec1233",
            user: generateTypes.user(),
            applications: [
              generateTypes.application({
                status: "Applied",
                specialist: generateTypes.specialist({
                  name: "Test Account",
                }),
              }),
              generateTypes.application({
                status: "Application Rejected",
                specialist: generateTypes.specialist({
                  name: "Mr Rejected",
                }),
              }),
            ],
          }),
        },
      ),
    ],
  });

  await app.findByText("Test Account", {}, { timeout: 5000 });
  expect(app.queryByText("Mr Rejected")).not.toBeInTheDocument();
});
