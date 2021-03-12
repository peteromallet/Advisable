import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Text, Box, Button, Stack } from "@advisable/donut";
import BottomScrollListener from "react-bottom-scroll-listener";
import { Plus } from "@styled-icons/heroicons-outline";
import { GUILD_EVENTS_QUERY } from "./queries.js";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import TopEvent from "./components/TopEvent";
import EventsList from "./components/EventsList";
import Loading from "./components/Loading";

const Events = () => {
  const history = useHistory();
  const historyPopped = history.action === "POP";

  const { data, loading, fetchMore } = useQuery(GUILD_EVENTS_QUERY, {
    fetchPolicy: historyPopped ? "cache-first" : "network-only",
    nextFetchPolicy: historyPopped ? "cache-first" : "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const hasNextPage = data?.guildEvents.pageInfo.hasNextPage || false;
  const endCursor = data?.guildEvents.pageInfo.endCursor;
  const guildEvents = data?.guildEvents.edges.map((e) => e.node) || [];

  const [topEvent, ...events] = guildEvents;

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  const handleCreateEvent = () =>
    window.open("https://www.formstack.com/todo-new-event", "CreateEvent");

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
        <Stack spacing="xl">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Text fontSize="3xl" color="neutral900">
              Events
            </Text>
            <Button
              size="l"
              prefix={<Plus />}
              aria-label="Create Event"
              onClick={handleCreateEvent}
              css={`
                background-color: #234ee4;
              `}
            >
              <Text fontSize="xl">Create Event</Text>
            </Button>
          </Box>

          {loading && !events.length ? <Loading /> : null}
          {topEvent && <TopEvent event={topEvent} />}
          <EventsList events={events} />
        </Stack>

        {!loading && events.length > 0 && !hasNextPage ? (
          <Box py="12" textAlign="center">
            <Text color="neutral500">
              You have reached the end of the events list.
            </Text>
          </Box>
        ) : null}
      </Box>
    </ErrorBoundary>
  );
};

export default Events;
