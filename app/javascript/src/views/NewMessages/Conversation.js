import React, { useRef, useLayoutEffect, useMemo } from "react";
import SimpleBar from "simplebar-react";
import { Avatar, Box, Text, Stack } from "@advisable/donut";
import MessageComposer from "./MessageComposer";
import Message from "./Message";
import { useMessages } from "./queries";
import { useParams } from "react-router-dom";
import commaSeparated from "src/utilities/commaSeparated";

export default function Conversation() {
  const { id } = useParams();
  const endOfMessagesRef = useRef(null);
  const { data, loading } = useMessages({
    variables: { id },
  });

  useLayoutEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [data]);

  const messageEdges = useMemo(() => {
    const edges = data?.conversation?.messages?.edges || [];
    return [...edges].sort((x, y) => {
      return x.node.createdAt - y.node.createdAt;
    });
  }, [data]);

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
            {!loading && (
              <Stack paddingY={10} spacing="4xl" divider="neutral200">
                {messageEdges.map((edge) => (
                  <Message key={edge.node.id} message={edge.node} />
                ))}
              </Stack>
            )}
            <div ref={endOfMessagesRef} />
          </Box>
        </SimpleBar>
      </Box>
      <Box width="100%" paddingBottom={5} maxWidth="720px" mx="auto">
        <MessageComposer conversation={data?.conversation} />
      </Box>
    </Box>
  );
}
