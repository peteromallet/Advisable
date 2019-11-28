import gql from "graphql-tag";
import consultationFragment from "./consultationFragment";

export default gql`
  ${consultationFragment}

  mutation createConsultation($input: CreateConsultationInput!) {
    createConsultation(input: $input) {
      consultation {
        ...ConsultationFields
      }
    }
  }
`;
