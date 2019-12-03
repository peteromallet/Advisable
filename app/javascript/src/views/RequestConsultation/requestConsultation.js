import gql from "graphql-tag";

export default gql`
  mutation createConsultation($input: CreateConsultationInput!) {
    createConsultation(input: $input) {
      consultation {
        id
      }
    }
  }
`;
