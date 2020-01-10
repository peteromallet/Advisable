import gql from "graphql-tag";

export default gql`
  query getSearchData {
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
