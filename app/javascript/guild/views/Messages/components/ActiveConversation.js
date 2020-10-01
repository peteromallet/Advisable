import React from "react";
import { css } from "styled-components";
import { motion } from "framer-motion";
import { truncate } from "lodash-es";
import { Text, Avatar, Link, theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { StyledMessage } from "../styles";
import { sender } from "../stub";

const ActiveConversation = ({ activeConversation }) => (
  <GuildBox
    px="l"
    py="s"
    height="100%"
    overflow="scroll"
    spaceChildrenVertical={16}
    css={css`
      border-bottom: 1px solid ${theme.colors.ghostWhite};
    `}
  >
    <Text as={GuildBox} size="xs" color="darkGray" alignSelf="center">
      started {activeConversation.date}
    </Text>

    {activeConversation?.messages?.map((message, key) => (
      <GuildBox key={key} spaceChildrenVertical={4}>
        <StyledMessage
          key={key}
          as={motion.div}
          sender={key == 1}
          width={{ _: "90%", m: "65%" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: key * 0.12 }}
        >
          {key !== 1 && (
            <GuildBox
              mr="s"
              flexShrink={0}
              flexCenterBoth
              spaceChildrenVertical={4}
            >
              <Avatar
                width={"24px"}
                as={Link}
                to={`/profiles/id`}
                size="s"
                name={"First"}
                url={sender.avatar}
              />
              <Text size="xs" color="quartz">
                {truncate("LongFirstName", { length: 13 })}
              </Text>
            </GuildBox>
          )}
          <Text>
            Hey this is a really long message Hey this is a really long message
          </Text>
        </StyledMessage>
        <Text
          as={GuildBox}
          alignSelf={key == 1 ? "flex-end" : "flex-start"}
          color="darkGray"
          size="xxs"
        >
          5 mins ago
        </Text>
      </GuildBox>
    ))}
  </GuildBox>
);

export default ActiveConversation;
