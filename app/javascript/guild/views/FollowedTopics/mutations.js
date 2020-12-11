import { gql } from "@apollo/client";

export const UNFOLLOW_GUILD_TOPIC = gql`
  mutation unfollowGuildTopic($input: UnfollowGuildTopicInput!) {
    unfollowGuildTopic(input: $input) {
      guildTopic {
        id
        name
      }
    }
  }
`;
