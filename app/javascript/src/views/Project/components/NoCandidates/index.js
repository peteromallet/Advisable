import React from "react";
import { Box, Card, Text } from "@advisable/donut";
import illustration from "./illustration.png";

export default function NoCandidates({ text, subText }) {
  return (
    <Card padding="xxl">
      <Box textAlign="center" maxWidth="450px" mx="auto">
        <img
          src={illustration}
          style={{ width: "100%", maxWidth: "300px" }}
          alt=""
        />
        <Text mb="xs" fontSize="l" fontWeight="medium" color="blue900">
          {text}
        </Text>
        {subText && (
          <Text lineHeight="m" color="neutral700">
            {subText}
          </Text>
        )}
      </Box>
    </Card>
  );
}
