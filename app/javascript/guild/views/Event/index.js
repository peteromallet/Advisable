import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Text, Box, Button, useTheme } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import { Calendar } from "@styled-icons/heroicons-outline";
import NotFound from "@advisable-main/components/PreviousProjectFormModal/NotFound";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import useScrollToTop from "@advisable-main/hooks/useScrollToTop";
import { GUILD_EVENT_QUERY } from "./queries.js";
import { REGISTER_GUILD_EVENT, UNREGISTER_GUILD_EVENT } from "./mutations.js";
import Markdown from "@guild/components/Markdown";
import EventAttendees from "./components/EventAttendees";
import Loading from "@advisable-main/components/Loading";
import { CoverImage } from "@guild/components/CoverImage";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";
import { StyledLineClamp } from "@guild/views/Events/styles";
import HourDateTag from "./components/HourDateTag";
import DurationDate from "./components/DurationDate";
import HostBioDetail from "./components/HostBioDetail";
import Share from "./components/Share";

const Event = () => {
  useScrollToTop();

  const { eventId } = useParams();
  const viewer = useViewer();
  const theme = useTheme();

  const { data, loading } = useQuery(GUILD_EVENT_QUERY, {
    variables: { id: eventId },
    skip: !eventId,
  });
  const event = data?.guildEvent;
  const isHost = viewer?.id === event?.host?.id;

  const [register, { loading: registerLoading }] = useMutation(
    REGISTER_GUILD_EVENT,
  );
  const [unregister, { loading: unregisterLoading }] = useMutation(
    UNREGISTER_GUILD_EVENT,
  );

  const handleEventRegistration = () => {
    const variables = {
      input: {
        guildEventId: eventId,
      },
    };
    event.attending ? unregister({ variables }) : register({ variables });
  };

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attendees = event?.attendees.edges.map((e) => e.node) || [];

  if (loading) return <Loading />;
  if (!event) return <NotFound resource="Event" id={eventId} />;

  return event ? (
    <ErrorBoundary>
      {event.coverPhotoUrl ? (
        <OrbitsBackground
          height="400px"
          color="purple"
          zIndex="-1"
          orbits={10}
        />
      ) : null}

      <Box pb={20} mt="14" paddingX={{ _: "3", m: 0 }}>
        <Box
          mx="auto"
          maxWidth={["100%", "100%", "960px"]}
          marginTop={event.coverPhotoUrl ? "-400px" : 0}
        >
          <HourDateTag mb="2" date={event.startsAt} />
          <StyledLineClamp
            lines={2}
            size="38px"
            color="blue900"
            lineHeight="120%"
            fontWeight="semibold"
            letterSpacing="-0.02em"
            mb={7}
          >
            {event.title}
          </StyledLineClamp>

          {event.coverPhotoUrl ? (
            <Box height="466px" mb="10">
              <CoverImage
                height="100%"
                overflow="hidden"
                borderRadius="12px"
                cover={event.coverPhotoUrl}
              />
            </Box>
          ) : null}

          <Box display="flex" justifyContent="space-between">
            <Box display="flex" width="70%" flexDirection="column" mb={15}>
              <Text
                color="blue900"
                letterSpacing="-0.03em"
                lineHeight="l"
                fontSize="2xl"
                mb="4"
              >
                Event Details
              </Text>
              <Markdown>{event.description}</Markdown>
            </Box>

            <Box mt="12" width="260px" display="flex" flexDirection="column">
              <DurationDate
                mb="4"
                startsAt={event.startsAt}
                endsAt={event.endsAt}
              />
              {!isHost && (
                <Button
                  mb="3"
                  prefix={<Calendar />}
                  onClick={handleEventRegistration}
                  disabled={registerLoading || unregisterLoading}
                  css={`
                    background-color: #234ee4;
                  `}
                >
                  {event.attending ? "Unregister" : "Register for event"}
                </Button>
              )}
              <Share
                mb="8"
                event={event}
                width="100%"
                css={`
                  color: #234ee4;
                  background-color: #edeffd;
                  &:hover {
                    background-color: #edeffd !important;
                  }
                `}
              />
              <HostBioDetail host={event.host} />
            </Box>
          </Box>

          <Box width="100%">
            <Text
              color="blue900"
              letterSpacing="-0.03em"
              lineHeight="l"
              fontSize="2xl"
              mb="5"
            >
              Attendees
            </Text>
            <EventAttendees
              attendees={attendees}
              attendeesCount={event.attendeesCount}
            />
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  ) : null;
};

export default Event;
