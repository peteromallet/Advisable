import React from "react";
import { Card } from "@advisable/donut";
import CoverImage from "./CoverImage";
import Info from "./Info";

function AboutSection({ specialist, isOwner, viewer }) {
  return (
    <Card
      bg="#fff"
      mt={[0, "m"]}
      mx={["-12px", 0]}
      padding="sm"
      paddingBottom="l"
      borderRadius={[0, 12]}
      mb="xl"
    >
      <CoverImage coverPhoto={specialist.coverPhoto} isOwner={isOwner} />
      <Info specialist={specialist} isOwner={isOwner} viewer={viewer} />
    </Card>
  );
}

export default AboutSection;
