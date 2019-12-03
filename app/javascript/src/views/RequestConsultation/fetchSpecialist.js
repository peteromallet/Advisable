import gql from "graphql-tag";

const fetchSpecialist = gql`
  query specialist($id: ID!) {
    specialist(id: $id) {
      id
      avatar
      name
      firstName
      location
      reviewsCount
      ratings {
        overall
      }
      skills(projectSkills: true, limit: 10) {
        id
        name
      }
    }
  }
`;

export default fetchSpecialist;
