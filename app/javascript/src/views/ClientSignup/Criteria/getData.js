import gql from "graphql-tag";

export default gql`
  {
    skills {
      label: name
      value: name
    }
    industries {
      label: name
      value: name
    }
  }
`;
