import { gql } from "@apollo/client";

export const SELECT_DATA = gql`
  {
    industries {
      id
      label: name
      value: name
    }
    skills(local: true) {
      id
      label: name
      value: name
    }
    countries {
      id
      label: name
      value: name
    }
    popularSkills(first: 10) {
      nodes {
        label: name
      }
    }
    popularGuildCountries {
      label: name
    }
  }
`;
