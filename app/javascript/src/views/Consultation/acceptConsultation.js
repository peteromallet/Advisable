import { gql } from "@apollo/client";

const acceptConsultation = gql`
  mutation acceptConsultation($input: AcceptConsultationInput!) {
    acceptConsultation(input: $input) {
      interview {
        id
        airtableId
      }
    }
  }
`;

export default acceptConsultation;
