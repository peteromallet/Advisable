import { useMutation } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import CREATE_CLIENT_ACCOUNT from "./createClientAccount.gql";
import CREATE_FREELANCER_ACCOUNT from "./createFreelancerAccount.gql";

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

export const useCreateFreelancerAccount = () =>
  useMutation(CREATE_FREELANCER_ACCOUNT, {
    update(cache, { data, errors }) {
      if (!errors) {
        cache.writeQuery({
          query: VIEWER,
          data: {
            viewer: data.createFreelancerAccount.viewer,
          },
        });
      }
    },
  });
