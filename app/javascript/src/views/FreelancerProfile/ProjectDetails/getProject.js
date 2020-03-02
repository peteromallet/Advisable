import gql from "graphql-tag";

const getProject = gql`
  query getProject($specialist: ID!, $project: ID!) {
    specialist(id: $specialist) {
      id
      profileProject(id: $project) {
        id
        title
        description
        industry {
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
  }
`;

export default getProject;
