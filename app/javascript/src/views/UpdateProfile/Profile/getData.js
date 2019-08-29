import gql from "graphql-tag";

export default gql`
  {
    skills {
      value: name
      label: name
    }
    viewer {
      ... on Specialist {
        id
        bio
        name
        avatar
        skills
        hourlyRate
        publicUse
      }
    }
  }
`;
