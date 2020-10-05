import React from "react";
import { Text, Link, Button } from "@advisable/donut";
import { ArrowBack, ArrowForward } from "@styled-icons/ionicons-outline";
import { GuildBox } from "@guild/styles";

const MessageWithAction = ({
  actionLink,
  actionText,
  message,
  prefix,
  suffix,
}) => (
  <GuildBox
    m="l"
    p="l"
    width="100%"
    display="flex"
    alignItems="center"
    spaceChildrenVertical="16"
  >
    <Text fontWeight="medium" color="catalinaBlue100" size="3xl">
      {message}
    </Text>
    <Link to={actionLink}>
      <Button
        prefix={prefix && <ArrowBack />}
        suffix={suffix && <ArrowForward />}
        size="s"
        variant="subtle"
        marginBottom="24px"
      >
        {actionText}
      </Button>
    </Link>
  </GuildBox>
);

export default MessageWithAction;
