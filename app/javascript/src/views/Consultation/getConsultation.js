import { gql } from "@apollo/client";

const getConsultation = gql`
  query consultation($id: ID!) {
    consultation(id: $id) {
      id
      topic
      status
      user {
        id
        name
        companyName
      }
      specialist {
        id
        name
      }
      interview {
        id
        airtableId
      }
    }
  }
`;

export default getConsultation;
