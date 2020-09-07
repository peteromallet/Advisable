import React from "react";
import { Box, Text, Button, BulletList } from "@advisable/donut";
import { Pencil } from "@styled-icons/ionicons-solid";

export default function GoalsSummary({ project }) {
  return (
    <Box>
      <Text
        mb="s"
        fontSize="xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.024rem"
      >
        Project Goals
      </Text>
      <BulletList marginBottom="l">
        {project.goals.map((goal, i) => (
          <BulletList.Item key={i}>{goal}</BulletList.Item>
        ))}
      </BulletList>
      <Button size="s" prefix={<Pencil />} variant="subtle">
        Edit Goals
      </Button>
    </Box>
  );
}
