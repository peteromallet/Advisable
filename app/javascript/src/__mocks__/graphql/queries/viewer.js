import QUERY from "../../../graphql/queries/viewer";

// Testing mocks
export const mocks = {
  asClient: () => ({
    request: {
      query: QUERY,
    },
    result: {
      data: {
        viewer: {
          __typename: "User",
          id: 1,
          firstName: "Test",
          lastName: "Account",
          email: "test@test.com",
          airtableId: "airtableid",
          confirmed: true,
          companyName: "Test Corp",
          country: {
            __typename: "Country",
            id: 1,
            name: "Ireland",
          },
        },
      },
    },
  }),
  asSpecialist: () => ({
    request: {
      query: QUERY,
    },
    result: {
      data: {
        viewer: {
          __typename: "Specialist",
          id: 1,
          firstName: "Test",
          lastName: "Account",
          email: "test@test.com",
          airtableId: "airtableid",
          confirmed: true,
        },
      },
    },
  }),
  none: () => ({
    request: {
      query: QUERY,
    },
    result: {
      data: {
        viewer: null,
      },
    },
  }),
};

export default mocks;
