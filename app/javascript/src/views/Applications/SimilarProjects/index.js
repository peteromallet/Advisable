import React from "react";
import { Text, Card, Stack, Box, Avatar } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import { GET_SIMILAR_PROJECTS } from "./queries";
import renderLineBreaks from "../../../utilities/renderLineBreaks";

function SimilarProjects() {
  const { loading, data } = useQuery(GET_SIMILAR_PROJECTS);

  if (loading) return null;

  const { similarPreviousProjects } = data.viewer;

  return (
    <>
      <Text
        mb="8px"
        color="blue900"
        fontSize="24px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Previous Projects
      </Text>
      <Text color="neutral700" lineHeight="1.3rem" mb="l">
        Here are some examples of projects other specialists on Advisable have
        completed within your skill set
      </Text>
      <Stack spacing="m">
        {similarPreviousProjects.map((project) => (
          <Card padding="l" key={project.id}>
            <Text
              color="blue900"
              fontSize="20px"
              fontWeight="medium"
              letterSpacing="-0.03em"
            >
              {project.title}
            </Text>
            <Box height={1} bg="blue100" mt="16px" mb="16px" />
            <Box display="flex" alignItems="center">
              <Avatar
                size="s"
                url={project.specialist.avatar}
                name={project.specialist.name}
              />
              <Box pl="12px">
                <Text
                  fontSize="16px"
                  color="blue900"
                  fontWeight="medium"
                  mb="2px"
                >
                  {project.specialist.name}
                </Text>
                <Text color="neutral600" fontSize="14px">
                  {project.specialist.location}
                </Text>
              </Box>
            </Box>
            <Box height={1} bg="blue100" mt="16px" mb="20px" />
            <Text mb="l" fontSize="15px" lineHeight="1.3rem" color="neutral700">
              {renderLineBreaks(project.description)}
            </Text>
            {project.skills.map((skill) => (
              <Box
                px="8px"
                mr="8px"
                mb="8px"
                bg="blue100"
                height="28px"
                key={skill.id}
                color="blue600"
                fontSize="14px"
                fontWeight="500"
                borderRadius="8px"
                alignItems="center"
                display="inline-flex"
              >
                {skill.name}
              </Box>
            ))}
          </Card>
        ))}
      </Stack>
    </>
  );
}

export default SimilarProjects;
