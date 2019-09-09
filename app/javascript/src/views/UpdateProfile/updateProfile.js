import gql from "graphql-tag";

export default gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        id
        bio
        skills
      }
    }
  }
`;
