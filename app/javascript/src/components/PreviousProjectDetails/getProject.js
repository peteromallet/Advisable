import { gql } from "@apollo/client";

const getProject = gql`
  query getProject($id: ID!) {
    previousProject(id: $id) {
      id
      title
      description
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
      specialist {
        id
        name
        avatar
        location
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

export default getProject;
