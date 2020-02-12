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
      label: name
      value: name
    }
    industries {
      label: name
      value: name
    }
  }
`;
