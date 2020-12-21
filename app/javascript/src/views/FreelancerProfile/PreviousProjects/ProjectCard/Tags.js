import React from "react";
import { Text, Box, Tag } from "@advisable/donut";

function TagSuffix({ children, color }) {
  return (
    <Box bg="white" borderRadius={4} px={1} py={0.5} mr={1.5}>
      <Text color={color} fontSize="xs">
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
  const skillTag = primarySkill?.name || skills[0].name;
  const industryTag = primaryIndustry?.name || industries[0].name;
  const numOfSkills = skills.length - 1;
  const numOfIndustries = industries.length - 1;

  const SkillsSuffix = <TagSuffix color="blue500">+{numOfSkills}</TagSuffix>;
  const IndustrySuffix = (
    <TagSuffix color="cyan700">+{numOfIndustries}</TagSuffix>
  );

  return (
    <Box>
      <Tag suffix={SkillsSuffix} variant="skill" mr={1} mb={1.5} size="s">
        {skillTag}
      </Tag>
      <Tag suffix={IndustrySuffix} variant="industry" size="s">
        {industryTag}
      </Tag>
    </Box>
  );
}
