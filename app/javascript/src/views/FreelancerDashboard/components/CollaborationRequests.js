import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import CardButton from "src/components/CardButton";
import Loading from "src/components/Loading";
import { Stack, Box, Skeleton, Button, Text } from "@advisable/donut";
import { Adjustments } from "@styled-icons/heroicons-outline/Adjustments";
import { Pencil } from "@styled-icons/heroicons-outline/Pencil";
import CollaborationRequest from "./CollaborationRequest";
import { useCollaborationRequests } from "../queries";

const LoadingSkeleton = () => (
  <>
    <Box display="flex" width="100%" alignItems="center" mb={6}>
      <Skeleton width="40%" height="28px" my={1} />
      <Box ml="auto">
        <Skeleton width="88px" height="36px" borderRadius="18px" />
      </Box>
    </Box>
    <Stack spacing={4}>
      <Skeleton width="100%" height="200px" borderRadius="20px" />
      <Skeleton width="100%" height="220px" borderRadius="20px" />
      <Skeleton width="100%" height="200px" borderRadius="20px" />
      <Skeleton width="100%" height="200px" borderRadius="20px" />
    </Stack>
  </>
);

export default function CollaborationRequests() {
  const { data, loading, fetchMore } = useCollaborationRequests();

  const hasNextPage = data?.collaborationRequests.pageInfo.hasNextPage || false;
  const endCursor = data?.collaborationRequests.pageInfo.endCursor;
  const requests = data?.collaborationRequests.edges.map((edge) => (
    <CollaborationRequest key={edge.node.id} request={edge.node} />
  ));

  const [fetchingMode, setFetchingMode] = useState(false);
  const fetchMoreRequests = (turnOnFetchMode) => {
    turnOnFetchMode && setFetchingMode(true);
    if (!loading && hasNextPage && (fetchingMode || turnOnFetchMode)) {
      fetchMore({
        variables: { cursor: endCursor },
      });
    }
  };

  if (loading && !fetchingMode) {
    return <LoadingSkeleton />;
  }

  return (
    <Box>
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
          <Link to="/post">
            <Button variant="subtle" size="s" prefix={<Pencil />}>
              Post
            </Button>
          </Link>
        </Box>
      </Box>
      <Stack spacing={4}>
        {requests}
        {fetchingMode && loading && <Loading />}
        {hasNextPage && !fetchingMode && !loading && (
          <CardButton paddingY={6} onClick={() => fetchMoreRequests(true)}>
            Load more
          </CardButton>
        )}
      </Stack>
      <BottomScrollListener
        onBottom={fetchMoreRequests}
        offset={64}
        debounce={0}
      />
    </Box>
  );
}
