import { gql } from "@apollo/client";

const declineConsultation = gql`
  mutation declineConsultation($input: DeclineConsultationInput!) {
    declineConsultation(input: $input) {
      consultation {
        id
        status
      }
    }
  }
`;

export default declineConsultation;
