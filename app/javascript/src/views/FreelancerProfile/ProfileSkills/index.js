import { Box, Text, Tag } from "@advisable/donut";

function ProfileSkills({ data }) {
  const skills = data.specialist.projectSkills.nodes.slice(0, 12);

  return (
    <Box pt="xl">
      <Text fontSize="l" mb="xs" fontWeight="medium">
        Skills
      </Text>
      {skills.map(skill => (
        <Tag mr="xxs" mb="xxs" key={skill.id}>
          {skill.name}
        </Tag>
      ))}
    </Box>
  );
}

export default ProfileSkills;
