import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_GUILD_POST } from "./mutations";
import { GUILD_POST_QUERY } from "@guild/views/Post/queries";
import { PATH_REGEX } from "./useComposerModal";
import YourPost from "./YourPost";

export default function CreateGuildPost() {
  const history = useHistory();
  const location = useLocation();

  const [createGuildPost] = useMutation(CREATE_GUILD_POST, {
    update(cache, { data }) {
      const { guildPost } = data?.createGuildPost;
      cache.writeQuery({
        query: GUILD_POST_QUERY,
        variables: { id: guildPost.id },
        data: { guildPost },
      });
    },
  });

  const pathPrefix = location.pathname.replace(PATH_REGEX, "");

  const handleCreateGuildPost = async (values) => {
    const response = await createGuildPost({
      variables: {
        input: { ...values },
      },
    });

    const { guildPost } = response.data?.createGuildPost;
    history.replace(`${pathPrefix}/composer/${guildPost.id}/edit`);
    history.push(`${pathPrefix}/composer/${guildPost.id}/images`);
  };

  return <YourPost onSubmit={handleCreateGuildPost} />;
}
