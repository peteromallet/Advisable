import gql from "graphql-tag";

export default gql`
  {
    viewer {
      ... on Specialist {
        id
        bio
        name
        city
        avatar
        website
        publicUse
        linkedin
        country {
          id
        }
      }
    }
  }
`;
