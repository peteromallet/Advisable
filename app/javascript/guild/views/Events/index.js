import React from "react";
import { useQuery } from "@apollo/client";
import { Text, Box, Button, useModal } from "@advisable/donut";
import { DialogDisclosure } from "reakit/Dialog";
import useViewer from "@advisable-main/hooks/useViewer";
import BottomScrollListener from "react-bottom-scroll-listener";
import { Plus } from "@styled-icons/heroicons-outline/Plus";
import { EVENTS_QUERY } from "./queries.js";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import FeaturedEvent from "./components/FeaturedEvent";
import EventsList from "./components/EventsList";
import Loading from "./components/Loading";
import NoResults from "@guild/components/NoResults";
import FormstackModal from "./components/FormstackModal";

const Events = () => {
  const modal = useModal();
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
            Upcoming Events
          </Text>
          <DialogDisclosure {...modal}>
            {(disclosure) => (
              <Button {...disclosure} prefix={<Plus />}>
                Create Event
              </Button>
            )}
          </DialogDisclosure>
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
      <FormstackModal
        modal={modal}
        label="Create Event"
        src={`https://advisable.formstack.com/forms/guild_event_form?id=${viewer.id}`}
      />
    </ErrorBoundary>
  );
};

export default Events;
