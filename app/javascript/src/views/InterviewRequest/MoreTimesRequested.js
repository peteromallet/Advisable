import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import CalendarIllustration from "src/illustrations/zest/calendar";

const MoreTimesRequested = ({ clientName }) => (
  <Box textAlign="center">
    <CalendarIllustration width="250px" color={theme.colors.blue100} />
    <Text lineHeight="m" color="neutral800">
      We have requested more times from {clientName} and will let you know when
      they respond.
    </Text>
  </Box>
);

export default MoreTimesRequested;
