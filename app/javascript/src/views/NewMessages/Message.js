import React from "react";
import { relativeDate } from "@guild/utils";
import { Box, Avatar, Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";

export default function Message({ message }) {
  const viewer = useViewer();
  const isAuthor = viewer.accountId === message.account.id;

  return (
    <Box display="flex" justifyContent={isAuthor ? "flex-end" : "flex-start"}>
      <Box
        display="flex"
        alignItems="flex-end"
        maxWidth={{ _: "100%", m: "90%" }}
      >
        {!isAuthor ? (
          <Box flexShrink="0" mr={2}>
            <Avatar size="xxs" name={message.account.name} />
          </Box>
        ) : null}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={isAuthor ? "flex-end" : "flex-start"}
        >
          <Box
            py={2}
            px={3}
            fontSize="md"
            flexShrink="1"
            marginBottom={2}
            color="neutral800"
            lineHeight="1.2rem"
            borderRadius="12px"
            bg={isAuthor ? "blue200" : "white"}
            boxShadow="0 4px 8px -4px rgba(0, 0, 0, 0.2)"
          >
            <Text fontSize="xs" mb={0.5} fontWeight="medium">
              {message.account.name}
            </Text>
            <Text
              data-message
              css={`
                white-space: pre-wrap;
                white-space: pre-line;
              `}
            >
              {message.content}
            </Text>
          </Box>
          <Text
            fontSize="2xs"
            color="neutral400"
            ml={isAuthor ? null : 1}
            mr={isAuthor ? 1 : null}
            textAlign={isAuthor ? "right" : "left"}
          >
            {relativeDate(message.createdat)} ago
          </Text>
        </Box>
        {isAuthor ? (
          <Box flexShrink="0" ml={2}>
            <Avatar size="xxs" name={message.account.name} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
