import { gql } from "@apollo/client";

export default gql`
  fragment PreviousProjectFields on PreviousProject {
    id
    draft
  }
`;
