import React, { useRef, useLayoutEffect, useMemo, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { Avatar, Box, Text, Stack } from "@advisable/donut";
import MessageComposer from "./MessageComposer";
import Message from "./Message";
import { useMessages, useUpdateLastRead } from "./queries";
import { useParams } from "react-router-dom";
import commaSeparated from "src/utilities/commaSeparated";

function ConversationMessages({ conversation }) {
  const endOfMessagesRef = useRef(null);
  const [updateLastRead] = useUpdateLastRead(conversation);

  const messageEdges = useMemo(() => {
    const edges = conversation?.messages?.edges || [];
    return [...edges].sort((x, y) => {
      return x.node.createdAt - y.node.createdAt;
    });
  }, [conversation?.messages]);

  useEffect(() => {
    if (conversation.unreadMessageCount > 0) {
      updateLastRead();
    }
  }, [conversation.unreadMessageCount, updateLastRead]);

  useLayoutEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messageEdges]);

  return (
    <>
      <Stack paddingY={10} spacing="4xl" divider="neutral200">
        {messageEdges.map((edge) => (
          <Message key={edge.node.id} message={edge.node} />
        ))}
      </Stack>
      <div ref={endOfMessagesRef} />
    </>
  );
}

export default function Conversation() {
  const { id } = useParams();
  const { data, loading } = useMessages({
    variables: { id },
  });

  const participants = data?.conversation?.participants || [];

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        height="72px"
        flexShrink={0}
        display="flex"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="neutral100"
      >
        <Box
          width="100%"
          maxWidth="700px"
          mx="auto"
          display="flex"
          alignItems="center"
        >
          <Box marginRight={2}>
            {participants.map((participant, index) => (
              <Avatar
                size="s"
                key={participant.id}
                border="2px solid"
                borderColor="white"
                url={participant.avatar}
                name={participant.firstName}
                marginLeft={index > 0 ? "-16px" : null}
              />
            ))}
          </Box>
          <Text fontSize="lg" fontWeight={500}>
            {!loading && commaSeparated(participants.map((p) => p.firstName))}
          </Text>
        </Box>
      </Box>
      <Box height="0" width="100%" flexGrow={1} flexShrink={1}>
        <SimpleBar style={{ height: "100%" }}>
          <Box maxWidth="700px" mx="auto">
            {data?.conversation && (
              <ConversationMessages conversation={data.conversation} />
            )}
          </Box>
        </SimpleBar>
      </Box>
      <Box width="100%" paddingBottom={5} maxWidth="720px" mx="auto">
        <MessageComposer conversation={data?.conversation} />
      </Box>
    </Box>
  );
}
