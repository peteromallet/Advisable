import gql from "graphql-tag";

export default gql`
  query {
    skills {
      id
      value: name
      label: name
    }
    industries {
      value: name
      label: name
    }
  }
`;
