import React from "react";
import useViewer from "@advisable-main/hooks/useViewer";
import ComposerModal from "@guild/components/ComposerModal";
import { useComposerModal } from "@guild/components/ComposerModal/useComposerModal";
import { Box, Button, Text, DialogDisclosure } from "@advisable/donut";
import { Pencil } from "@styled-icons/heroicons-outline/Pencil";
import CollaborationRequest from "./CollaborationRequest";

export default function CollaborationRequests({ collaborationRequests }) {
  const viewer = useViewer();
  const composerModal = useComposerModal("/guild/composer");

  const requests = collaborationRequests.map((cr) => (
    <CollaborationRequest key={cr.id} request={cr} />
  ));

  return (
    <Box>
      <ComposerModal
        modal={composerModal}
        specialistId={viewer.id}
        onPublish={() => null}
      />
      <Box display="flex" alignItems="center" mb={8}>
        <Text color="neutral900" fontSize="2xl" fontWeight={450}>
          Collaboration requests
        </Text>
        <DialogDisclosure
          as={Button}
          variant="subtle"
          size="s"
          ml="auto"
          prefix={<Pencil />}
          {...composerModal}
          aria-label="Create a Post"
          data-walkthrough="createPost"
        >
          Post
        </DialogDisclosure>
      </Box>
      <Box>{requests}</Box>
    </Box>
  );
}
