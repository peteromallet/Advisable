import React from "react";
import { Box, useBreakpoint } from "@advisable/donut";
import HeaderLayout from "@guild/components/Layouts/HeaderLayout";
import Posts from "@guild/components/Posts";
import Topics from "@guild/components/Topics";
import NewMembers from "@guild/components/NewMembers";
import Filters from "@guild/components/Filters";

const Feed = () => {
  const lUp = useBreakpoint("lUp");

  return (
    <HeaderLayout>
      <Box paddingY="2xl" paddingX={{ _: "lg", m: "2xl" }} display="flex">
        {lUp && (
          <Box width="200px" flexShrink="0">
            <Topics />
          </Box>
        )}
        <Box width="100%" paddingX={{ _: null, l: "xl" }}>
          <Filters />
          <Posts />
        </Box>
        {lUp && (
          <Box width="260px" flexShrink="0">
            <NewMembers />
          </Box>
        )}
      </Box>
    </HeaderLayout>
  );
};

export default Feed;
