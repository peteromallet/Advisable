import { gql } from "@apollo/client";

const acceptConsultation = gql`
  mutation acceptConsultation($input: AcceptConsultationInput!) {
    acceptConsultation(input: $input) {
      interview {
        id
      }
    }
  }
`;

export default acceptConsultation;
