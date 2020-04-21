import gql from "graphql-tag";

export default gql`
  {
    popularSkills(first: 10) {
      nodes {
        id
        name
      }
    }
    skills {
      id
      label: name
      value: name
    }
    industries {
      id
      label: name
      value: name
    }
  }
`;
