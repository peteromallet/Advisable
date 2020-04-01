import gql from "graphql-tag";

export default gql`
  query PreviousProject($id: ID!) {
    previousProject(id: $id) {
      id
      title
      description
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
`;
