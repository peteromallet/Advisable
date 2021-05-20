import React, { useLayoutEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import Sticky from "react-stickynode";
import { Text, Box, useTheme, useBreakpoint } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import NotFound from "src/views/NotFound";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import useScrollToTop from "@advisable-main/hooks/useScrollToTop";
import { EVENT_QUERY } from "./queries.js";
import { UPDATE_EVENT_REGISTRATION } from "./mutations.js";
import Markdown from "@guild/components/Markdown";
import EventAttendees from "./components/EventAttendees";
import Loading from "@advisable-main/components/Loading";
import { CoverImage } from "@guild/components/CoverImage";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import { StyledLineClamp } from "@guild/views/Events/styles";
import { useEventStatus, EventStatus } from "./components/useEventStatus";
import HourDateTag from "./components/HourDateTag";
import DurationDate from "./components/DurationDate";
import HostBio from "./components/HostBio";
import DetailsAside from "./components/DetailsAside";
import RegisterButton from "./components/RegisterButton";
import StatusNotice from "./components/StatusNotice";

const Event = () => {
  useScrollToTop();

  const { eventId } = useParams();
  const viewer = useViewer();
  const theme = useTheme();
  const sUp = useBreakpoint("sUp");
  const detailsRef = useRef(null);

  const { data, loading } = useQuery(EVENT_QUERY, {
    variables: { id: eventId },
    skip: !eventId,
  });
  const event = data?.event;
  const isHost = viewer?.id === event?.host?.id;

  const eventStatus = useEventStatus(event);

  const [updateRegistration, { loading: loadingRegistration }] = useMutation(
    UPDATE_EVENT_REGISTRATION,
  );

  const handleEventRegistration = () => {
    const inProgress = eventStatus === EventStatus.inProgress;
    const joinEvent = () => window.open(event.url, "JoinEvent");
    if (inProgress && event.attending) return joinEvent();

    /* Register or Unregister */
    const variables = {
      input: {
        eventId: eventId,
        actionType: event.attending ? "UNREGISTER" : "REGISTER",
      },
    };
    updateRegistration({ variables });
    if (inProgress) joinEvent();
  };

  useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attendees = event?.attendees.edges.map((e) => e.node) || [];
  const detailsBottomBoundary =
    detailsRef?.current?.clientHeight + detailsRef?.current?.offsetTop;

  if (loading) return <Loading />;
  if (!event) return <NotFound resource="Event" id={eventId} />;

  return event ? (
    <ErrorBoundary>
      {event.coverPhotoUrl ? (
        <OrbitsBackground
          height={["300px", "400px"]}
          color={event.color}
          zIndex="-1"
        />
      ) : null}

      <Box pb="20" mt="14" paddingX="3">
        <Box
          mx="auto"
          maxWidth={["100%", "960px"]}
          marginTop={event.coverPhotoUrl ? (sUp ? "-400px" : "-300px") : 0}
        >
          <HourDateTag mb="2" date={event.startsAt} />
          <StyledLineClamp
            lines={2}
            fontSize="38px"
            color="blue900"
            lineHeight="120%"
            fontWeight="semibold"
            letterSpacing="-0.02em"
            mb="7"
            as={Text}
          >
            {event.title}
          </StyledLineClamp>

          {event.coverPhotoUrl ? (
            <Box height={["175px", "466px"]} mb="10">
              <CoverImage
                height="100%"
                overflow="hidden"
                borderRadius="12px"
                cover={event.coverPhotoUrl}
                boxShadow="l"
              />
            </Box>
          ) : null}

          <Box
            display="flex"
            flexDirection={["column", "row"]}
            justifyContent={["flex-start", "space-between"]}
          >
            <Box
              display="flex"
              width={["100%", "70%"]}
              flexDirection="column"
              mb={["0", "15"]}
              ref={detailsRef}
            >
              <StatusNotice eventStatus={eventStatus} />
              <Text
                mb={3}
                fontSize="2xl"
                fontWeight="500"
                color="neutral900"
                letterSpacing="-0.03rem"
              >
                Event Details
              </Text>
              <Markdown>{event.description}</Markdown>
            </Box>

            <Box
              mt={["4", "12"]}
              width={["100%", "30%"]}
              marginLeft={["0", "5", "15"]}
              display="flex"
              flexDirection="column"
            >
              <Sticky
                top={100}
                enabled={sUp}
                bottomBoundary={detailsBottomBoundary}
              >
                {sUp ? (
                  <DetailsAside
                    event={event}
                    eventStatus={eventStatus}
                    handleEventRegistration={handleEventRegistration}
                    unregisterable={isHost || loadingRegistration}
                  />
                ) : null}
                <HostBio color={event.color} host={event.host} />
              </Sticky>
            </Box>
          </Box>

          {event.attendeesCount > 0 ? (
            <Box marginY={["12", "0"]} width="100%">
              <Text
                mb={3}
                fontSize="2xl"
                fontWeight="500"
                color="neutral900"
                letterSpacing="-0.03rem"
              >
                Attendees
              </Text>
              <EventAttendees
                attendees={attendees}
                attendeesCount={event.attendeesCount}
              />
            </Box>
          ) : null}
        </Box>

        {!sUp ? (
          <Box
            position="fixed"
            bottom="0"
            marginX="-12px"
            background="white"
            width="100%"
            borderTop="solid 1px #F1F1F3"
          >
            <Box
              padding="4"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <DurationDate startsAt={event.startsAt} endsAt={event.endsAt} />
              <RegisterButton
                width="50%"
                mb="0"
                eventStatus={eventStatus}
                attending={event.attending}
                disabled={loadingRegistration}
                onClick={handleEventRegistration}
              />
            </Box>
          </Box>
        ) : null}
      </Box>
    </ErrorBoundary>
  ) : null;
};

export default Event;
