import { cleanup } from "@testing-library/react";
import renderApp from "../../../testHelpers/renderApp";
import mockData from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import FETCH_SPECIALIST from "../fetchSpecialist";
import GET_CONSULTATION from "../getConsultation";

afterEach(cleanup);

test("Can link back to a particular consultation via query params", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
  });

  const graphQLMocks = [
    {
      request: {
        query: VIEWER,
      },
      result: {
        data: {
          viewer: null,
        },
      },
    },
    {
      request: {
        query: FETCH_SPECIALIST,
        variables: {
          id: specialist.airtableId,
        },
      },
      result: {
        data: {
          specialist,
        },
      },
    },
    {
      request: {
        query: GET_CONSULTATION,
        variables: { id: consultation.id },
      },
      result: {
        data: {
          consultation,
        },
      },
    },
  ];

  const app = renderApp({
    route: `/request_consultation/${specialist.airtableId}?consultation=${consultation.id}`,
    graphQLMocks,
  });

  const header = await app.findByText(
    "Select the times you will be availabile",
    { exact: false }
  );

  expect(header).toBeInTheDocument();
});
