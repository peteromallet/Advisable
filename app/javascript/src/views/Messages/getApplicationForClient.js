import { gql } from "@apollo/client";

export default gql`
  query application($id: ID!) {
    application(id: $id) {
      id
      rate
      status
      airtableId
      availability
      monthlyLimit
      projectType
      project {
        id
        airtableId
      }
      specialist {
        id
        name
        city
        firstName
        linkedin
        country {
          id
          name
        }
        image {
          url
        }
      }
    }
  }
`;
