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

  const { body, title, id } = guildPost;

  const handleUpdate = async (values) => {
    await updateGuildPost({
      variables: {
        input: {
          guildPostId: id,
          ...values,
        },
      },
    });
    navigate(`/composer/${id}/images`);
  };

  return <YourPost onSubmit={handleUpdate} initialValues={{ body, title }} />;
}
