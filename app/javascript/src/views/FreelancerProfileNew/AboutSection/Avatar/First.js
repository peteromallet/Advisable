import React from "react";
import { Box, Card } from "@advisable/donut";

function Avatar({ avatar }) {
  return (
    <Card
      width="148px"
      height="148px"
      borderRadius="50%"
      mt="-32px"
      ml="l"
      mr="m"
    >
      <Box
        as="img"
        src={avatar}
        width="148px"
        height="148px"
        borderRadius="50%"
        css="object-fit: cover;"
      />
    </Card>
  );
}

export default Avatar;
