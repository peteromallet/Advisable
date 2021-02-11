import { gql } from "@apollo/client";

export default gql`
  query {
    skills {
      id
      value: name
      label: name
    }
  }
`;
