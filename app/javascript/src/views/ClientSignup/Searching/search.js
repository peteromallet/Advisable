import gql from "graphql-tag";

export default gql`
  query specialists($skill: String!) {
    specialists(skill: $skill) {
      id
      name
    }
  }
`;
