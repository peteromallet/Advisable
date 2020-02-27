import React from "react";
import { Box, Text } from "@advisable/donut";
import { StyledProfileSkill } from "./styles";

function ProfileSkills({ data }) {
  const skills = data.specialist.skills.slice(0, 12);

  return (
    <Box pt="xl">
      <Text fontSize="l" mb="xs" fontWeight="medium">
        Skills
      </Text>
      {skills.map(skill => (
        <StyledProfileSkill key={skill.id}>{skill.name}</StyledProfileSkill>
      ))}
    </Box>
  );
}

export default ProfileSkills;
