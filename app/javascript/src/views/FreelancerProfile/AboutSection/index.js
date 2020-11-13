import React from "react";
import { Card, Box } from "@advisable/donut";
import CoverImage from "./CoverImage";
import Info from "./Info";
import Navigation from "./Navigation";

function AboutSection({ specialist, isOwner, viewer }) {
  return (
    <Card
      bg="#fff"
      mt={[0, "m"]}
      mx={["-12px", 0]}
      borderRadius={[0, 12]}
      marginBottom="3xl"
    >
      <Box padding="sm" paddingBottom="l">
        <CoverImage coverPhoto={specialist.coverPhoto} isOwner={isOwner} />
        <Info specialist={specialist} isOwner={isOwner} viewer={viewer} />
      </Box>
      {specialist.guild && viewer?.guild ? <Navigation /> : null}
    </Card>
  );
}

export default AboutSection;
