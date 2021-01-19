import React from "react";
import { Text, Box, Tag } from "@advisable/donut";

function TagSuffix({ children, color }) {
  return (
    <Box bg="white" borderRadius={4} px={1} py={0.5}>
      <Text color={color} fontSize="2xs">
        {children}
      </Text>
    </Box>
  );
}

export default function Tags({
  primarySkill,
  skills,
  primaryIndustry,
  industries,
}) {
  const skillTag = primarySkill?.name || skills[0]?.name;
  const industryTag = primaryIndustry?.name || industries[0]?.name;
  const numOfSkills = skills.length - 1;
  const numOfIndustries = industries.length - 1;

  const SkillsSuffix = numOfSkills && (
    <TagSuffix color="blue500">+{numOfSkills}</TagSuffix>
  );
  const IndustrySuffix = numOfIndustries && (
    <TagSuffix color="cyan700">+{numOfIndustries}</TagSuffix>
  );

  return (
    <Box>
      {skillTag ? (
        <Tag
          suffix={numOfSkills > 0 ? SkillsSuffix : null}
          variant="blue"
          mr={1}
          mb={1.5}
          size="s"
        >
          {skillTag}
        </Tag>
      ) : null}
      {industryTag ? (
        <Tag
          suffix={numOfIndustries > 0 ? IndustrySuffix : null}
          variant="cyan"
          size="s"
          mb={1.5}
        >
          {industryTag}
        </Tag>
      ) : null}
    </Box>
  );
}
