import { gql, useMutation } from "@apollo/client";

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      viewer {
        ... on User {
          id
          needsToSetAPassword
        }
        ... on Specialist {
          id
          needsToSetAPassword
        }
      }
    }
  }
`;

export function useUpdatePassword(opts) {
  return useMutation(UPDATE_PASSWORD, opts);
}
