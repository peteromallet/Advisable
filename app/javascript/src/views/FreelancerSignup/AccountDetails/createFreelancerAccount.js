import gql from "graphql-tag";
import { viewerFields } from "../../../graphql/queries/viewer";

export default gql`
  ${viewerFields}

  mutation createFreelancerAccount($input: CreateFreelancerAccountInput!) {
    createFreelancerAccount(input: $input) {
      token
      viewer {
        ...ViewerFields
      }
    }
  }
`;
