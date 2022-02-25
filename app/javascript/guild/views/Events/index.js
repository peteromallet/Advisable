import React from "react";
import { useQuery } from "@apollo/client";
import { Text, Box, Button } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { Plus } from "@styled-icons/heroicons-outline/Plus";
import { EVENTS_QUERY } from "./queries.js";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import FeaturedEvent from "./components/FeaturedEvent";
import EventsList from "./components/EventsList";
import Loading from "./components/Loading";
import NoResults from "@guild/components/NoResults";

const Events = () => {
  const viewer = useViewer();

  const { data, loading, fetchMore } = useQuery(EVENTS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const hasNextPage = data?.events.pageInfo.hasNextPage || false;
  const endCursor = data?.events.pageInfo.endCursor;
  const events = data?.events.edges.map((e) => e.node) || [];

  const [featuredEvent, ...latestEvents] = events;

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  return (
    <ErrorBoundary>
      <BottomScrollListener
        onBottom={onReachedBottom}
        debounce={0}
        offset={80}
      />

      <Box
        mx="auto"
        mt="9"
        paddingX={{ _: "3" }}
        maxWidth={["100%", "100%", "1056px"]}
      >
        <Box
          marginBottom={8}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontSize="4xl"
            fontWeight="500"
            letterSpacing="-0.03rem"
            color="neutral900"
          >
            Events
          </Text>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://advisable.formstack.com/forms/host_an_event?sid=${viewer.id}`}
          >
            <Button prefix={<Plus />}>Propose Event</Button>
          </a>
        </Box>
        {loading && !events.length ? <Loading /> : null}
        {featuredEvent && <FeaturedEvent event={featuredEvent} />}
        <EventsList events={latestEvents} />

        {!loading && events.length > 0 && !hasNextPage ? (
          <Box py="12" textAlign="center">
            <Text color="neutral500">
              You have reached the end of the events list.
            </Text>
          </Box>
        ) : null}

        {!loading && events.length === 0 && (
          <NoResults message="There are no upcoming Events" />
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default Events;
