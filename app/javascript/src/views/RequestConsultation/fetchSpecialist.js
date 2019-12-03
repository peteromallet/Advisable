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
      skills(projectSkills: true) {
        id
        name
      }
    }
  }
`;

export default fetchSpecialist;
