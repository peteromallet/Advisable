import { gql } from "@apollo/client";
import { viewerFields } from "../../graphql/queries/viewer";

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
