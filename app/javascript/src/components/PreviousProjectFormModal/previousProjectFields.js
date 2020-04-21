import gql from "graphql-tag";

export default gql`
  fragment PreviousProjectFields on PreviousProject {
    id
    draft
  }
`;
