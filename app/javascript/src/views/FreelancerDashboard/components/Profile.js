import React from "react";
import { Box, Button, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import useViewer from "src/hooks/useViewer";

export default function Hero() {
  const viewer = useViewer();

  return (
    <>
      <Box display="flex">
        <PassportAvatar src={viewer.avatar} name={viewer.name} size="xl" />
        <Box>
          <Text fontSize="3xl" fontWeight={550} color="neutral900">
            {viewer.name}
          </Text>
          <Button variant="ghost" size="s">
            Update profile
          </Button>
        </Box>
      </Box>
    </>
  );
}
