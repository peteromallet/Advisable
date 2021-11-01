import React from "react";
import { Box } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";

export default function ProfilePictureArticle({ specialist }) {
  return (
    <Box marginTop={18} marginBottom={4} display="inline-block">
      <PassportAvatar
        size={"lg"}
        name={specialist.name}
        src={specialist.avatar}
        stroke={"2px"}
      />
    </Box>
  );
}
