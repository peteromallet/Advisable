import { gql, useMutation } from "@apollo/client";

export const REJECT_APPLICATION = gql`
  mutation rejectApplication($input: RejectApplicationInput!) {
    rejectApplication(input: $input) {
      application {
        id
        status
      }
    }
  }
`;

export function useRejectApplication(opts = {}) {
  return useMutation(REJECT_APPLICATION, opts);
}
