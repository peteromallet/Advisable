import { gql } from "@apollo/client";

export const GUILD_LAST_READ_QUERY = gql`
  {
    viewer {
      ... on Specialist {
        id
        guildUnreadNotifications
      }
    }
  }
`;

export const UPCOMING_EVENTS_COUNT = gql`
  {
    upcomingEventsCount
  }
`;

export const LOGOUT = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`;
