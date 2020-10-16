import { Box, Text, Paragraph } from "@advisable/donut";

const NoStoppedProjects = () => {
  return (
    <Box maxWidth={400} style={{ margin: "40px auto" }}>
      <Text fontSize="lg" fontWeight="medium" textAlign="center" mb="xs">
        No stopped projects
      </Text>
      <Paragraph fontSize="sm" textAlign="center">
        You have not stopped working with any clients. When you do they will
        show up here.
      </Paragraph>
    </Box>
  );
};

export default NoStoppedProjects;
