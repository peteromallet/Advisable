import React from "react";
import Loading from "src/components/Loading";
import { X } from "@styled-icons/heroicons-solid";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import CircularButton from "src/components/CircularButton";
import { Box, useBackground } from "@advisable/donut";
import CollaborationRequestForm from "src/components/CollaborationRequestForm";
import { usePost, useUpdatePost } from "./queries";
import useViewer from "src/hooks/useViewer";

export default function EditPost() {
  useBackground("white");
  const viewer = useViewer();
  const { id } = useParams();
  const navigate = useNavigate();
  const [update] = useUpdatePost();
  const { data, loading } = usePost(id);

  const post = data?.guildPost;
  if (post && post.author.id !== viewer.id) {
    return <Navigate to={`/posts/${post.id}`} />;
  }

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

    navigate(`/posts/${id}`);
  };

  if (loading) return <Loading />;

  const initialValues = {
    title: post.title || "",
    body: post.body || "",
    labels: post.labels.map((l) => ({
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
