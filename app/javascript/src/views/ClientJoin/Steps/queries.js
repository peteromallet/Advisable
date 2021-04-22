import { gql } from "@apollo/client";
import viewerFields from "src/graphql/fragments/viewerFields.graphql";

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
