import React from "react";
import { Text, Link, Avatar } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { truncate } from "lodash-es";

const NewMember = ({ newMember }) => {
  return (
    <GuildBox px="xs" alignItems="center" spaceChildrenHorizontal={16}>
      <Avatar
        as={Link}
        to={`/profiles/${newMember.id}`}
        name={newMember.name}
        url={newMember.avatar}
        size={"s"}
      />
      <GuildBox spaceChildrenVertical={2}>
        <Text fontSize="xs" fontWeight="medium" color="calalinaBlue100">
          {truncate(newMember.name, { length: 30 })}
        </Text>
        {newMember.location.length && (
          <Text fontSize="xxs" fontWeight="light" color="darkGrey">
            {newMember.location}
          </Text>
        )}
        <Text fontSize="xxs" fontWeight="light" color="quartz">
          Joined: {newMember.guildJoinedTimeAgo} ago
        </Text>
      </GuildBox>
    </GuildBox>
  );
};

export default NewMember;
