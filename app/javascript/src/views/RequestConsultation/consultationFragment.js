import gql from "graphql-tag";

export default gql`
  fragment ConsultationFields on Consultation {
    id
    topic
    status
    user {
      id
      name
      firstName
      lastName
      companyName
      availability
      timeZone
    }
    specialist {
      id
      name
    }
  }
`;
