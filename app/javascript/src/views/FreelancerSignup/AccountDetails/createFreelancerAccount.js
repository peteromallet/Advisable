import { gql } from "@apollo/client";
import viewerFields from "src/graphql/fragments/viewerFields.graphql";
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
