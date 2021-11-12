import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import useViewer from "@advisable-main/hooks/useViewer";
import ComposerModal from "@guild/components/ComposerModal";
import { useComposerModal } from "@guild/components/ComposerModal/useComposerModal";
import { Stack, Box, Button, Text, DialogDisclosure } from "@advisable/donut";
import { Adjustments } from "@styled-icons/heroicons-outline/Adjustments";
import { Pencil } from "@styled-icons/heroicons-outline/Pencil";
import CollaborationRequest from "./CollaborationRequest";
import { useCollaborationRequests } from "../queries";

export default function CollaborationRequests() {
  const viewer = useViewer();
  const composerModal = useComposerModal("/guild/composer");
  const { data, loading, fetchMore } = useCollaborationRequests();

  const hasNextPage = data?.collaborationRequests.pageInfo.hasNextPage || false;
  const endCursor = data?.collaborationRequests.pageInfo.endCursor;
  const requests = data?.collaborationRequests.edges.map((edge) => (
    <CollaborationRequest key={edge.node.id} request={edge.node} />
  ));

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({
        variables: { cursor: endCursor },
      });
    }
  };

  return (
    <Box>
      <ComposerModal
        modal={composerModal}
        specialistId={viewer.id}
        onPublish={() => null}
      />
      <Box display="flex" alignItems="center" mb={6}>
        <Text
          color="neutral900"
          fontSize="2xl"
          fontWeight={450}
          lineHeight="36px"
        >
          Collaboration requests
        </Text>
        <Box ml="auto">
          <Button
            as={Link}
            to="/guild/topics"
            variant="ghost"
            size="s"
            mr={2}
            prefix={<Adjustments />}
          >
            Customize
          </Button>
          <DialogDisclosure
            as={Button}
            variant="subtle"
            size="s"
            prefix={<Pencil />}
            {...composerModal}
            aria-label="Create a Post"
            data-walkthrough="createPost"
          >
            Post
          </DialogDisclosure>
        </Box>
      </Box>
      <Stack spacing={4}>{requests}</Stack>
      <BottomScrollListener
        onBottom={onReachedBottom}
        offset={64}
        debounce={0}
      />
    </Box>
  );
}
