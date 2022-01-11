import { useMutation } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import CREATE_CLIENT_ACCOUNT from "./createClientAccount.gql";
import UPDATE_PASSWORD from "./updatePassword.gql";

export const useCreateClientAccount = () =>
  useMutation(CREATE_CLIENT_ACCOUNT, {
    update(cache, { data, errors }) {
      if (!errors) {
        cache.writeQuery({
          query: VIEWER,
          data: {
            viewer: data.createClientAccount.viewer,
          },
        });
      }
    },
  });

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
