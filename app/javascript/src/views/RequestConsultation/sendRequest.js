import gql from "graphql-tag";

export default gql`
  mutation sendConsultationRequest($input: SendConsultationRequestInput!) {
    sendConsultationRequest(input: $input) {
      consultation {
        id
        status
        topic
      }
    }
  }
`;
