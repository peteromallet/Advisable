import React from "react";
import { ChevronRight } from "@styled-icons/heroicons-solid";
import { Avatar, Box, Text, Button } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import { DateTime } from "luxon";
import useViewer from "src/hooks/useViewer";
import { Link } from "react-router-dom";

function dateForMessage(iso) {
  const date = DateTime.fromISO(iso);
  return date.toFormat("dd MMM, yyyy HH:mm");
}

export default function GuildPostMessage({ message }) {
  const viewer = useViewer();
  const isAuthor = viewer.account.id === message.author?.id;

  return (
    <Box
      width="100%"
      id={message.id}
      borderRadius="12px"
      bg="white"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
      padding={4}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={6}
      >
        <Box flexShrink="0" pr={3} display="flex">
          <Avatar
            bg="blue100"
            color="blue300"
            size="xs"
            display="inline-flex"
            name={message.author?.name}
          />
        </Box>
        <Box width="100%">
          <Text fontSize="17px" fontWeight={550}>
            {message.author?.name || "Deleted user"}
          </Text>
        </Box>
        <Box flexShrink={0}>
          <Text fontSize="xs" fontWeight={400} color="neutral500">
            {dateForMessage(message.createdAt)}
          </Text>
        </Box>
      </Box>
      <Box width="100%">
        <Text
          autoLink
          fontSize="17px"
          color="neutral900"
          lineHeight="24px"
          style={{ overflowWrap: "break-word" }}
        >
          {renderLineBreaks(message.content)}
        </Text>
        {message.post && (
          <Link to={`/guild/posts/${message.post.id}`}>
            <Box
              padding={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="neutral100"
              marginTop={5}
              color="neutral900"
              borderRadius="8px"
            >
              <Box>
                {!isAuthor && message.calendlyUrl && (
                  <Text fontWeight={500} marginBottom={2}>
                    {message.author?.name} wants to connect with you over your
                    post
                  </Text>
                )}
                <Text fontWeight={400}>{message.post.title}</Text>
              </Box>
              <ChevronRight size={20} />
            </Box>
          </Link>
        )}
      </Box>
      {!isAuthor && message.calendlyUrl && (
        <Button
          as="a"
          marginTop={5}
          variant="gradient"
          target="_blank"
          href={message.calendlyUrl}
        >
          Schedule call
        </Button>
      )}
    </Box>
  );
}
