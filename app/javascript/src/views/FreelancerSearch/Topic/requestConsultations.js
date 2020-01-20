import gql from "graphql-tag";

export default gql`
  mutation requestConsultations($input: RequestConsultationsInput!) {
    requestConsultations(input: $input) {
      consultations {
        id
      }
    }
  }
`;
