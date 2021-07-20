import React, { useLayoutEffect } from "react";
import { Avatar, Box, Heading, Text, Stack, useTheme } from "@advisable/donut";
import AvatarStack from "src/components/AvatarStack";
import ConversationLink from "./ConversationLink";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import MessageComposer from "./MessageComposer";

const data = {
  conversations: [
    {
      id: "con_1",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_2",
          firstName: "Jim",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_2",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_2",
          firstName: "Jim",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_3",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_2",
          firstName: "Jim",
          avatar: null,
          isViewer: false,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_4",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_2",
          firstName: "Jim",
          avatar: null,
          isViewer: false,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
        {
          id: "acc_4",
          firstName: "Jim",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_5",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_6",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_7",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_8",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_9",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_10",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_11",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
        {
          id: "acc_4",
          firstName: "Toby",
          avatar: null,
          isViewer: false,
        },
        {
          id: "acc_5",
          firstName: "April",
          avatar: null,
          isViewer: false,
        },
        {
          id: "acc_6",
          firstName: "Sam",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_12",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_13",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
    {
      id: "con_14",
      participants: [
        {
          id: "acc_1",
          firstName: "Michael",
          avatar: null,
          isViewer: true,
        },
        {
          id: "acc_3",
          firstName: "Dwight",
          avatar: null,
          isViewer: false,
        },
      ],
      lastMessage: {
        id: "mes_1",
        content: "This is a test message. They can be quite long.",
        createdAt: "2021-06-04T11:23:43",
      },
    },
  ],
};

function Message({ message }) {
  return (
    <Box display="flex" width="100%">
      <Box flexShrink="0" pr={3}>
        <Avatar
          bg="blue100"
          color="blue300"
          size="s"
          name={message.author.name}
        />
      </Box>
      <Box width="100%">
        <Box
          width="100%"
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Text fontSize="18px" fontWeight={520} marginBottom={1}>
            {message.author.name}
          </Text>
          <Text
            fontSize="xs"
            fontWeight={400}
            marginBottom={2}
            color="neutral400"
          >
            20:32
          </Text>
        </Box>
        <Text autoLink color="neutral800" lineHeight="24px">
          {message.content}
        </Text>
      </Box>
    </Box>
  );
}

export default function NewMessages() {
  const { setTheme } = useTheme();

  useLayoutEffect(() => {
    setTheme((t) => ({ ...t, background: "beige" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  return (
    <Box display="flex">
      <Box
        width="380px"
        flexShrink="0"
        bg="white"
        height="calc(100vh - 60px)"
        css={`
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        `}
      >
        <Box display="flex" flexDirection="column" height="100%">
          <Box
            height="72px"
            paddingX={6}
            display="flex"
            flexShrink={0}
            alignItems="center"
            borderBottom="1px solid"
            borderColor="neutral100"
          >
            <Heading size="2xl">Messages</Heading>
          </Box>
          <SimpleBar style={{ height: "calc(100vh - 132px)" }}>
            <Box paddingY={2} paddingX={4}>
              {data.conversations.map((conversation) => (
                <ConversationLink
                  key={conversation.id}
                  conversation={conversation}
                />
              ))}
            </Box>
          </SimpleBar>
        </Box>
      </Box>
      <Box
        width="100%"
        height="calc(100vh - 60px)"
        display="flex"
        flexDirection="column"
      >
        <Box
          height="72px"
          paddingX={6}
          display="flex"
          flexShrink={0}
          alignItems="center"
          borderBottom="1px solid"
          borderColor="neutral100"
        >
          <AvatarStack size="s">
            <Avatar name="Jim" />
            <Avatar name="Pam" />
            <Avatar name="Michael" />
          </AvatarStack>
          <Text fontSize="lg" fontWeight={500}>
            Jim, Pam and Michael
          </Text>
        </Box>
        <Box height="0" width="100%" flexGrow={1} flexShrink={1}>
          <SimpleBar style={{ height: "100%" }}>
            <Box maxWidth="680px" mx="auto">
              <Stack paddingY={10} spacing="4xl" divider="neutral100">
                <Message
                  message={{
                    author: { name: "Thomas Cullen" },
                    content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  }}
                />
                <Message
                  message={{
                    author: { name: "Thomas Cullen" },
                    content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  }}
                />
                <Message
                  message={{
                    author: { name: "Thomas Cullen" },
                    content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  }}
                />
                <Message
                  message={{
                    author: { name: "Thomas Cullen" },
                    content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  }}
                />
              </Stack>
            </Box>
          </SimpleBar>
        </Box>
        <Box width="100%" paddingBottom={5} maxWidth="680px" mx="auto">
          <MessageComposer />
        </Box>
      </Box>
    </Box>
  );
}
