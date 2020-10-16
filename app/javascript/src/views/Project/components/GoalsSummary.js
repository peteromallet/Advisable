import { Box, Text, BulletList } from "@advisable/donut";

export default function GoalsSummary({ project, children }) {
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
      {children}
    </Box>
  );
}
