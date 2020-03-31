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

      projectSkills {
        nodes {
          id
          name
        }
      }

      industries {
        id
        name
      }

      ratings {
        overall
      }

      previousProjects {
        nodes {
          id
          title
          excerpt
          primaryIndustry {
            id
            name
            color
          }
          skills {
            id
            name
          }
          industries {
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
