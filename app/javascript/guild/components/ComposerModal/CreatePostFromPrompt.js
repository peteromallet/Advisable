import React from "react";
import { useCreateGuildPost } from "./mutations";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import YourPost from "./YourPost";

export default function CreatePostFromPrompt({ promptLabel }) {
  const { navigate } = useLocationStages();
  const [createGuildPost] = useCreateGuildPost();

  const handleCreateGuildPost = async (values) => {
    const response = await createGuildPost({
      variables: {
        input: {
          ...values,
          type: "Post",
          promptLabelId: promptLabel.id,
        },
      },
    });
    const guildPost = response.data?.createGuildPost.guildPost;
    navigate(`/composer/${guildPost?.id}/images`);
  };

  const initialValues = {
    body: promptLabel?.prompt,
  };

  return (
    <YourPost onSubmit={handleCreateGuildPost} initialValues={initialValues} />
  );
}
