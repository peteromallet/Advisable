import { renderRoute, mockViewer, mockQuery, mockData } from "test-utils";
import GET_DATA from "./fetchData";

const specialist = mockData.specialist();

test("Shoes application invites", async () => {
  const app = renderRoute({
    route: "/applications",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_DATA,
        {},
        {
          viewer: {
            ...specialist,
            invitations: [
              mockData.application({
                status: "Invited To Apply",
                project: mockData.project({
                  primarySkill: "Testing Invites",
                }),
              }),
            ],
            applications: [],
          },
        },
      ),
    ],
  });

  await app.findByText(/Good news/i);
  const skill = app.getByText("Testing Invites");
  expect(skill).toBeInTheDocument();
});
