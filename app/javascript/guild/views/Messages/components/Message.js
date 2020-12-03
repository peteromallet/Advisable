import React from "react";
import { Link } from "react-router-dom";
import { relativeDate } from "@guild/utils";
import { Calendar } from "@styled-icons/ionicons-outline";
import { Box, Avatar, Text, Button } from "@advisable/donut";

export default function Message({ message, author, isAuthor }) {
  return (
    <Box display="flex" justifyContent={isAuthor ? "flex-end" : "flex-start"}>
      <Box
        display="flex"
        alignItems="flex-end"
        maxWidth={{ _: "100%", m: "90%" }}
      >
        {!isAuthor ? (
          <Box flexShrink="0" mr={2}>
            <Avatar
              size="xxs"
              as={Link}
              to={`/freelacners/${author.id}/guild`}
              url={author.avatar}
              name={author.name}
            />
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
            bg={isAuthor ? "blue100" : "neutral100"}
          >
            <Text fontSize="xs" mb={0.5} fontWeight="medium">
              {author.name}
            </Text>
            <Text
              css={`
                white-space: pre-wrap;
                white-space: pre-line;
              `}
            >
              {message.body}
            </Text>
          </Box>
          {message.attributes?.calendly_link ? (
            <Button
              as="a"
              href={message.attributes?.calendly_link}
              target="_blank"
              rel="noreferrer noopener"
              prefix={<Calendar />}
              mb={2}
              size="s"
            >
              Book a call with {author.firstName}
            </Button>
          ) : null}
          <Text
            fontSize="2xs"
            color="neutral400"
            ml={isAuthor ? null : 1}
            mr={isAuthor ? 1 : null}
            textAlign={isAuthor ? "right" : "left"}
          >
            {relativeDate(message.dateCreated)} ago
          </Text>
        </Box>
        {isAuthor ? (
          <Box flexShrink="0" ml={2}>
            <Avatar
              size="xxs"
              as={Link}
              name={author.name}
              url={author.avatar}
              to={`/freelacners/${author.id}/guild`}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
