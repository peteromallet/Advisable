import React from "react";
import { useBreakpoint } from "@advisable/donut";
import HeaderLayout from "@guild/components/Layouts/HeaderLayout";
import { GuildBox } from "@guild/styles";
import Posts from "@guild/components/Posts";
import Topics from "@guild/components/Topics";
import NewMembers from "@guild/components/NewMembers";
import Filters from "@guild/components/Filters";

const Feed = () => {
  const lUp = useBreakpoint("lUp");

  return (
    <HeaderLayout>
      <Filters />
      <GuildBox m="l" display="flex" spaceChildrenHorizontal="24">
        {lUp && <Topics />}
        <Posts />
        {lUp && <NewMembers />}
      </GuildBox>
    </HeaderLayout>
  );
};

export default Feed;
