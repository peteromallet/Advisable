import React from "react";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import YourPost from "./YourPost";
import { useUpdateGuildPostWriteCache } from "./mutations";

/*
  First Step for editing an existing Guild Post
*/
export default function EditGuildPost({ guildPost }) {
  const { navigate } = useLocationStages();
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const { denormalizedType: type, body, title, id } = guildPost;

  const handleUpdate = async (values) => {
    const response = await updateGuildPost({
      variables: {
        input: {
          guildPostId: id,
          ...values,
        },
      },
    });

    if (!response.errors) {
      navigate(`/guild/composer/${id}/images`);
    }

    return response;
  };

  return (
    <YourPost
      guildPost={guildPost}
      onSubmit={handleUpdate}
      initialValues={{ type, body, title }}
    />
  );
}
