import gql from "graphql-tag";

export default gql`
  query interview($id: ID!) {
    interview(id: $id) {
      id
      status
      startsAt
      timeZone
      user {
        id
        companyName
        availability(excludeConflicts: true)
      }
      application {
        id
        specialist {
          id
          phoneNumber
        }
      }
    }
  }
`;
