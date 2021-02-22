import { gql } from "@apollo/client";
import GuildEventFields from "@guild/graphql/fragments/guildEventFields";

export const GUILD_EVENT_QUERY = gql`
  ${GuildEventFields}
  query guildEvent($id: ID!) {
    guildEvent(id: $id) {
      ...GuildEventFields
      description
      attendees(first: 20) {
        edges {
          node {
            id
            firstName
            avatar
          }
        }
      }
    }
  }
`;
