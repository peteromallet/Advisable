import React from "react";
import { Box, Text, Button, BulletList } from "@advisable/donut";
import { Pencil } from "@styled-icons/ionicons-solid";

export default function CharacteristicsSummary({ project }) {
  return (
    <Box>
      <Text
        mb="s"
        fontSize="xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.024rem"
      >
        Required Characteristics
      </Text>
      <BulletList marginBottom="2xl">
        {project.requiredCharacteristics.map((item, i) => (
          <BulletList.Item key={i}>{item}</BulletList.Item>
        ))}
      </BulletList>
      <Text
        mb="s"
        fontSize="xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.024rem"
      >
        Optional Characteristics
      </Text>
      <BulletList marginBottom="l">
        {project.optionalCharacteristics.map((item, i) => (
          <BulletList.Item key={i}>{item}</BulletList.Item>
        ))}
      </BulletList>
      <Button size="s" prefix={<Pencil />} variant="subtle">
        Edit Characteristics
      </Button>
    </Box>
  );
}
