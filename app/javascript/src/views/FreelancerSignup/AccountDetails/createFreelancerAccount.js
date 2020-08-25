import { gql } from "@apollo/client";
import { viewerFields } from "../../../graphql/queries/viewer";
import { SpecialistFields } from "../getProfile";

export default gql`
  ${viewerFields}
  ${SpecialistFields}

  mutation createFreelancerAccount($input: CreateFreelancerAccountInput!) {
    createFreelancerAccount(input: $input) {
      viewer {
        ...ViewerFields
        ...SpecialistFields
      }
    }
  }
`;
