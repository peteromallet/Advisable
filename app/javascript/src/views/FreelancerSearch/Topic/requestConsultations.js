import { gql } from "@apollo/client";

export default gql`
  mutation requestConsultations($input: RequestConsultationsInput!) {
    requestConsultations(input: $input) {
      consultations {
        id
      }
    }
  }
`;
