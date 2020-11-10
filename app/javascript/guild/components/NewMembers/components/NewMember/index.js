import React from "react";
import { Box, Text, Link, Avatar } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const NewMember = ({ newMember }) => {
  return (
    <GuildBox px="xs" alignItems="center" spaceChildrenHorizontal={24}>
      <GuildBox flexShrink={0}>
        <Avatar
          as={Link}
          to={`/profiles/${newMember.id}`}
          name={newMember.name}
          url={newMember.avatar}
          size={"s"}
        />
      </GuildBox>
      <Box minWidth="0">
        <Text
          truncate
          fontSize="s"
          marginBottom="2xs"
          fontWeight="medium"
          color="calalinaBlue100"
        >
          {newMember.name}
        </Text>
        {newMember.location.length && (
          <Text
            truncate
            fontSize="xs"
            fontWeight="light"
            color="neutral700"
            marginBottom="2xs"
          >
            {newMember.location}
          </Text>
        )}
        <Text fontSize="xs" fontWeight="light" color="neutral500">
          Joined: {newMember.guildJoinedTimeAgo} ago
        </Text>
      </Box>
    </GuildBox>
  );
};

export default NewMember;
