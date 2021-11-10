import React from "react";
import { Box, Button, Text, theme } from "@advisable/donut";
import LetterboxIllustration from "src/illustrations/zest/letterbox";

export default function ConsultationRequestSent({ specialist, dialog }) {
  return (
    <Box textAlign="center" maxWidth="300px" mx="auto">
      <LetterboxIllustration
        width="160px"
        marginBottom={2}
        color={theme.colors.blue300}
      />
      <Text marginBottom={2} fontWeight={600} fontSize="l">
        Request sent
      </Text>
      <Text marginBottom={8} lineHeight="20px">
        We have sent your request to {specialist.firstName} and will let you
        know when they respond.
      </Text>
      <Button onClick={dialog.hide} size="l" variant="dark">
        Okay
      </Button>
    </Box>
  );
}
