import React from "react";
import { Box, Text, Link, Avatar } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const FeaturedMember = ({ featuredMember }) => {
  return (
    <GuildBox px="xs" alignItems="center" spaceChildrenHorizontal={24}>
      <GuildBox flexShrink={0}>
        <Avatar
          as={Link}
          to={`/profiles/${featuredMember.id}`}
          name={featuredMember.name}
          url={featuredMember.avatar}
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
          {featuredMember.name}
        </Text>
        {featuredMember.location.length && (
          <Text
            truncate
            fontSize="xs"
            fontWeight="light"
            color="neutral700"
            marginBottom="2xs"
          >
            {featuredMember.location}
          </Text>
        )}
        <Text fontSize="xs" fontWeight="light" color="neutral500">
          Joined: {featuredMember.guildJoinedTimeAgo} ago
        </Text>
      </Box>
    </GuildBox>
  );
};

export default FeaturedMember;
