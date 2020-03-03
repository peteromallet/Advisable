import gql from "graphql-tag";

const getProfileData = gql`
  query getProfileData($id: ID!) {
    specialist(id: $id) {
      id
      name
      firstName
      avatar
      location
      bio
      skills(projectSkills: true) {
        id
        name
      }

      industries {
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

      profileProjects {
        nodes {
          id
          industry {
            id
            name
            color
          }
          title
          excerpt
          skills {
            id
            name
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
