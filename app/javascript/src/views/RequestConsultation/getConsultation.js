import gql from "graphql-tag";
import consultationFragment from "./consultationFragment";

const getConsultation = gql`
  ${consultationFragment}

  query consultation($id: ID!) {
    consultation(id: $id) {
      ...ConsultationFields
    }
  }
`;

export default getConsultation;
