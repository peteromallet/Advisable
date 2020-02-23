import gql from "graphql-tag";

const getProfileData = gql`
  query getProfileData($id: ID!) {
    specialist(id: $id) {
      id
      name
      avatar
      location
      bio
      skills(projectSkills: true, limit: 12) {
        id
        name
      }
      ratings {
        overall
      }
      reviews {
        id
        comment
      }
      previousProjects {
        project {
          ... on OffPlatformProject {
            id
            clientName
            description
          }
        }
      }
    }
  }
`;

export default getProfileData;
