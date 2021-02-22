import { gql } from "@apollo/client";
import GuildEventFields from "@guild/graphql/fragments/guildEventFields";

const AttendeesDetailsFields = gql`
  fragment AttendeesDetailsFields on SpecialistConnection {
    edges {
      node {
        id
        firstName
        avatar
      }
    }
  }
`;

export const REGISTER_GUILD_EVENT = gql`
  ${GuildEventFields}
  ${AttendeesDetailsFields}
  mutation registerGuildEvent($input: RegisterGuildEventInput!) {
    registerGuildEvent(input: $input) {
      guildEvent {
        ...GuildEventFields
        attendees(first: 20) {
          ...AttendeesDetailsFields
        }
      }
    }
  }
`;

export const UNREGISTER_GUILD_EVENT = gql`
  ${GuildEventFields}
  ${AttendeesDetailsFields}
  mutation unregisterGuildEvent($input: UnregisterGuildEventInput!) {
    unregisterGuildEvent(input: $input) {
      guildEvent {
        ...GuildEventFields
        attendees(first: 20) {
          ...AttendeesDetailsFields
        }
      }
    }
  }
`;
