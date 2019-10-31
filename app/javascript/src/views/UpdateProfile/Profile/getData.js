import gql from "graphql-tag";

export default gql`
  {
    skills(local: true) {
      value: name
      label: name
    }
    viewer {
      ... on Specialist {
        id
        bio
        name
        avatar
        skills {
          name
        }
        hourlyRate
        publicUse
      }
    }
  }
`;
