import gql from "graphql-tag";

export default gql`
  {
    viewer {
      ... on Specialist {
        id
        bio
        name
        avatar
        city
        country {
          id
        }
      }
    }
  }
`;
