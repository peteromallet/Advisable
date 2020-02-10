import gql from "graphql-tag";

export default gql`
  mutation UpdateConsultation($input: UpdateConsultationInput!) {
    updateConsultation(input: $input) {
      consultation {
        id
        topic
      }
    }
  }
`;
