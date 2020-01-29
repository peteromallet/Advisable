import gql from "graphql-tag";

export default gql`
  query getSearchData {
    viewer {
      ... on User {
        id
        companyType
        industry {
          id
          name
        }
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
