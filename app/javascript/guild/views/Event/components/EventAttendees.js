import React from "react";
import styled from "styled-components";
import { Box, Avatar, Link, Text } from "@advisable/donut";

const StyledRemainingAvatar = styled(Avatar)`
  background-color: #2c2e36;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function EventAttendees({ attendees = [], attendeesCount = 0 }) {
  const remaining =
    attendeesCount > attendees.length
      ? attendeesCount - attendees.length
      : null;

  return (
    <Box
      display="grid"
      gridGap="20px"
      data-testid="attendees"
      gridTemplateColumns="repeat(auto-fill, minmax(55px, 1fr))"
    >
      {attendees.map((attendee) => (
        <Box
          key={attendee.id}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            size="s"
            as={Link}
            name={attendee.name}
            url={attendee.avatar}
            to={`/freelancers/${attendee.id}`}
          />
          <Text fontSize="xs" mt="3">
            {attendee.firstName}
          </Text>
        </Box>
      ))}
      {remaining ? (
        <StyledRemainingAvatar size="s">+ {remaining}</StyledRemainingAvatar>
      ) : null}
    </Box>
  );
}
