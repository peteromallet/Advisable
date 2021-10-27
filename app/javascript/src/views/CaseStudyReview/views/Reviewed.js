import React from "react";
import { Box, Card, Text, Heading, theme } from "@advisable/donut";
import PencilIllustration from "src/illustrations/zest/pencil";

export default function Reviewed() {
  return (
    <Card padding={[4, 6]} pb={[8, 10]} borderRadius="16px">
      <Box display="flex" alignItems="center" flexDirection="column">
        <PencilIllustration width="256px" color={theme.colors.blue300} />
        <Heading mb="12px" size="3xl" textAlign="center">
          This Case Study has already been reviewed
        </Heading>
        <Text
          fontSize="17px"
          lineHeight="24px"
          color="neutral700"
          textAlign="center"
        >
          Please contact{" "}
          <a href="mailto:hello@advisable.com">hello@advisable.com</a> if there
          is a problem.
        </Text>
      </Box>
    </Card>
  );
}
