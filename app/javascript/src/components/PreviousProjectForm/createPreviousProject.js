import gql from "graphql-tag";

export default gql`
  mutation CreatePreviousProject($input: CreatePreviousProjectInput!) {
    createPreviousProject(input: $input) {
      previousProject {
        id
        title
        excerpt
        reviews {
          id
          name
          role
          comment
          ratings {
            overall
            skills
            qualityOfWork
            adherenceToSchedule
            availability
            communication
          }
        }
      }
    }
  }
`;
