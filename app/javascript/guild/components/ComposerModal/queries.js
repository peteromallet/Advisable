import { gql } from "@apollo/client";

export const SELECT_DATA = gql`
  {
    industries {
      label: name
      value: name
    }
    skills(local: true) {
      label: name
      value: name
    }
    countries {
      label: name
      value: name
    }
    popularSkills(first: 10) {
      nodes {
        label: name
        value: name
      }
    }
    popularGuildCountries {
      label: name
      value: name
    }
    guildOtherTopics {
      label: name
      value: name
    }
  }
`;
