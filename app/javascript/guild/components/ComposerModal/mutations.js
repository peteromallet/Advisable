import { gql, useMutation } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";
import { GUILD_POST_QUERY } from "@guild/views/Post/queries";
export const CREATE_GUILD_POST = gql`
  ${GuildPostFields}
  mutation createGuildPost($input: CreateGuildPostInput!) {
    createGuildPost(input: $input) {
      guildPost {
        ...GuildPostFields
        ... on GuildPostAdviceRequired {
          needHelp
        }
        author {
          location
          id
          bio
          firstName
          name
        }
      }
    }
  }
`;

export const UPDATE_GUILD_POST = gql`
  ${GuildPostFields}
  mutation updateGuildPost($input: UpdateGuildPostInput!) {
    updateGuildPost(input: $input) {
      guildPost {
        ...GuildPostFields
        ... on GuildPostAdviceRequired {
          needHelp
        }
        author {
          location
          id
          bio
          firstName
          name
        }
      }
    }
  }
`;
export const useUpdateGuildPost = () => useMutation(UPDATE_GUILD_POST);

export const CREATE_GUILD_POST_IMAGE = gql`
  mutation createGuildPostImage($input: CreateGuildPostImageInput!) {
    createGuildPostImage(input: $input) {
      image {
        id
        url
        cover
        position
      }
    }
  }
`;

export const UPDATE_GUILD_POST_IMAGE = gql`
  mutation updateGuildPostImage($input: UpdateGuildPostImageInput!) {
    updateGuildPostImage(input: $input) {
      image {
        id
        url
        cover
        position
      }
    }
  }
`;
export const useUpdateGuildPostImage = (props) =>
  useMutation(UPDATE_GUILD_POST_IMAGE, props);

export const DELETE_GUILD_POST_IMAGE = gql`
  mutation deleteGuildPostImage($input: DeleteGuildPostImageInput!) {
    deleteGuildPostImage(input: $input) {
      image {
        id
        url
        cover
        position
      }
    }
  }
`;
export const useDeleteGuildPostImage = () =>
  useMutation(DELETE_GUILD_POST_IMAGE);

export const useUpdateGuildPostWriteCache = () =>
  useMutation(UPDATE_GUILD_POST, {
    update(cache, { data }) {
      const guildPost = data.updateGuildPost.guildPost;
      cache.writeQuery({
        query: GUILD_POST_QUERY,
        variables: { id: guildPost.id },
        data: { guildPost },
      });
    },
  });
