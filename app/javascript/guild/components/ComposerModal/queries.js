import { gql } from "@apollo/client";

export const SELECT_DATA = gql`
  query guildPostEditorData {
    industries {
      label: name
      value: name
    }
    skills {
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
    otherLabels {
      label: name
      value: name
    }
  }
`;

export const POST_PROMPT_QUERY = gql`
  query postPrompt($id: ID!) {
    postPrompt(id: $id) {
      id
      prompt
      label {
        id
        name
        slug
      }
    }
  }
`;
