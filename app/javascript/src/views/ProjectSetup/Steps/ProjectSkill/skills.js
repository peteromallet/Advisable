import gql from "graphql-tag";

export default gql`
  query {
    skills(local: true) {
      id
      value: name
      label: name
    }
  }
`;
