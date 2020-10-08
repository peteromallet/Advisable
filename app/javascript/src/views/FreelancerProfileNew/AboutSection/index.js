import React from "react";
import { Card } from "@advisable/donut";
import CoverImage from "./CoverImage";
import Info from "./Info";

function AboutSection({ specialist, isOwner, viewer }) {
  const expandable = specialist.bio.length > TRUNCATE_LIMIT;
  const [expanded, setExpanded] = useState(!expandable);
  return (
    <Card
      minHeight="514px"
      bg="#fff"
      mt={[0, "m"]}
      mx={["-12px", 0]}
      p="12px 12px 18px 12px"
      borderRadius={[0, 12]}
      mb="xl"
    >
      <CoverImage coverPhoto={specialist.coverPhoto} isOwner={isOwner} />
      <Info specialist={specialist} isOwner={isOwner} viewer={viewer} />
    </Card>
  );
}

export default AboutSection;
