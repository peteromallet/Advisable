import { gql } from "@apollo/client";

export default gql`
  query {
    skills(local: true) {
      id
      value: name
      label: name
    }
  }
`;
