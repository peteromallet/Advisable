import gql from "graphql-tag";

export default gql`
  fragment ConsultationFields on Consultation {
    id
    topic
    status
    user {
      id
      name
      companyName
      availability
    }
    specialist {
      id
      name
    }
  }
`;
