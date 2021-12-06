import { gql } from "@apollo/client";

export const UNFOLLOW_GUILD_TOPIC = gql`
  mutation unfollowLabel($input: UnfollowLabelInput!) {
    unfollowLabel(input: $input) {
      label {
        id
        name
        slug
        value: name
        label: name
      }
    }
  }
`;

export const FOLLOW_GUILD_TOPIC = gql`
  mutation followLabel($input: FollowLabelInput!) {
    followLabel(input: $input) {
      label {
        id
        name
        slug
        value: name
        label: name
      }
    }
  }
`;
