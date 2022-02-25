import React from "react";
import { Box, Text, Avatar } from "@advisable/donut";
import pluralize from "src/utilities/pluralize";
import AvatarStack from "src/components/AvatarStack";

export default function AttendeesStack({ attendees, attendeesCount }) {
  return (
    <Box display="flex" alignItems="center">
      <AvatarStack size="s">
        {attendees.map((a) => (
          <Avatar key={a.id} name={a.name} url={a.avatar} />
        ))}
      </AvatarStack>
      <Text marginLeft={2.5} color="neutral500">
        {pluralize(attendeesCount, "Attending", "Attendees")}
      </Text>
    </Box>
  );
}
