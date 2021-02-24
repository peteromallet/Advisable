import { useMutation, gql } from "@apollo/client";

export const SET_UNAVAILABLE_UNTIL = gql`
  mutation setUnavailableUntil($input: SetUnavailableUntilInput!) {
    setUnavailableUntil(input: $input) {
      specialist {
        id
        unavailableUntil
      }
    }
  }
`;

export const useSetUnavailableUntil = (opts) => {
  return useMutation(SET_UNAVAILABLE_UNTIL, opts);
};
