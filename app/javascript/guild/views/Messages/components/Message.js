import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { relativeDate } from "@guild/utils";
import { Calendar } from "@styled-icons/ionicons-outline";
import { Box, Avatar, Text, Link, Button } from "@advisable/donut";

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
              as={RouterLink}
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
          <MessageContext author={author} message={message} />
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
          {message.attributes?.calendlyLink ? (
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

function contextMessage(type) {
  switch (type) {
    case "AdviceRequired":
      return "has offered help for your post:";
    default: {
      return "wants to connect with you over your post:";
    }
  }
}

function MessageContext({ author, message }) {
  if (!message.attributes?.calendlyLink) return null;
  const { post, postType, postTitle } = message.attributes;
  return (
    <Box
      mb={2}
      padding={3}
      border="1px solid"
      borderRadius="12px"
      borderColor="neutral200"
    >
      <Text fontSize="sm" lineHeight="1.2rem">
        <Link
          fontSize="sm"
          variant="dark"
          fontWeight="medium"
          to={`/freelancers/${author.id}`}
        >
          {author.name}
        </Link>
        {` ${contextMessage(postType)} `}
        <Link
          fontSize="sm"
          css={`
            display: inline;
          `}
          variant="dark"
          fontWeight="medium"
          to={`/posts/${post}`}
        >
          {postTitle}
        </Link>
      </Text>
    </Box>
  );
}
