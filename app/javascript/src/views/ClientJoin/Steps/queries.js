import { gql, useMutation } from "@apollo/client";
import viewerFields from "src/graphql/fragments/viewerFields.graphql";
import VIEWER from "src/graphql/queries/getViewer.graphql";

export const CREATE_CLIENT_ACCOUNT = gql`
  ${viewerFields}

  mutation CreateClientAccount($input: CreateClientAccountInput!) {
    createClientAccount(input: $input) {
      viewer {
        ...ViewerFields
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  ${viewerFields}

  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      viewer {
        ...ViewerFields
      }
    }
  }
`;

export function useUpdatePassword() {
  return useMutation(UPDATE_PASSWORD, {
    update(cache, { data }) {
      cache.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.updatePassword.viewer,
        },
      });
    },
  });
}
