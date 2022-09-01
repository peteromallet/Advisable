import React from "react";
import { X } from "@styled-icons/heroicons-solid";
import { Box, useBackground } from "@advisable/donut";
import CircularButton from "src/components/CircularButton";
import { Link, useNavigate } from "react-router-dom";
import View from "src/components/View";
import CollaborationRequestForm from "src/components/CollaborationRequestForm";
import { usePostCollaborationRequest } from "./queries";

export default function CollaborationRequest() {
  useBackground("white");
  const navigate = useNavigate();
  const [publish] = usePostCollaborationRequest();

  const handleSubmit = async (values) => {
    await publish({
      variables: {
        input: {
          title: values.title,
          body: values.body,
          labels: values.labels.map((l) => l.value),
        },
      },
    });

    navigate("/collaborate");
  };

  return (
    <View>
      <Box position="absolute" right="20px" top="20px">
        <Link to="/collaborate">
          <CircularButton icon={X} />
        </Link>
      </Box>
      <Box maxWidth="800px" marginX="auto" padding={12}>
        <CollaborationRequestForm onSubmit={handleSubmit} />
      </Box>
    </View>
  );
}
