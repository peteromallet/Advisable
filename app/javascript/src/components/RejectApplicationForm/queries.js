import { gql, useMutation, useQuery } from "@apollo/client";

const GET_APPLICATION = gql`
  query getApplication($id: ID!) {
    application(id: $id) {
      id
      specialist {
        id
        firstName
      }
      interview {
        id
        status
      }
    }
  }
`;

export function useApplication(opts = {}) {
  return useQuery(GET_APPLICATION, opts);
}

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
