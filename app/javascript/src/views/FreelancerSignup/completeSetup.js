import { gql } from "@apollo/client";
import { SpecialistFields } from "./getProfile";

export default gql`
  ${SpecialistFields}

  mutation CompleteSetup($input: CompleteSetupInput!) {
    completeSetup(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;
