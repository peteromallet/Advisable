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

          ... on Project {
            id
          }
        }
      }

      reviews {
        id
        name
        role
        comment
        companyName
        ratings {
          overall
          skills
          communication
          qualityOfWork
          availability
          adherenceToSchedule
        }
      }
    }
  }
`;

export default getProfileData;
