import gql from "graphql-tag";

export default gql`
  query {
    skills(local: true) {
      id
      name
    }
    industries {
      id
      name
    }
  }
`;
