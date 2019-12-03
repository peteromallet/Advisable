import gql from "graphql-tag";

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
