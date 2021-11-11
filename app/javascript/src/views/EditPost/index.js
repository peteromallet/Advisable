import React from "react";
import { X } from "@styled-icons/heroicons-solid";
import { Link, useParams, useHistory } from "react-router-dom";
import CircularButton from "src/components/CircularButton";
import { Box, useBackground } from "@advisable/donut";
import CollaborationRequestForm from "src/components/CollaborationRequestForm";
import { usePost, useUpdatePost } from "./queries";

export default function EditPost() {
  useBackground("white");
  const { id } = useParams();
  const history = useHistory();
  const [update] = useUpdatePost();
  const { data, loading } = usePost(id);

  const handleSubmit = async (values) => {
    await update({
      variables: {
        input: {
          guildPostId: id,
          title: values.title,
          body: values.body,
          labels: values.labels.map((l) => l.name),
        },
      },
    });

    history.push(`/posts/${id}`);
  };

  if (loading) return null;

  const initialValues = {
    title: data.guildPost.title || "",
    body: data.guildPost.body || "",
    labels: data.guildPost.labels.map((l) => ({
      value: l.name,
      label: l.name,
    })),
  };

  return (
    <Box position="relative">
      <Box position="absolute" right="20px" top="20px">
        <Link to={`/posts/${id}`}>
          <CircularButton icon={X} />
        </Link>
      </Box>
      <Box maxWidth="800px" padding={12} marginX="auto">
        <CollaborationRequestForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          buttonLabel="Save changes"
        />
      </Box>
    </Box>
  );
}
