import { gql } from "@apollo/client";
import viewerFields from "src/graphql/fragments/viewerFields.graphql";

export default gql`
  ${viewerFields}

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      viewer {
        ...ViewerFields
      }
    }
  }
`;
