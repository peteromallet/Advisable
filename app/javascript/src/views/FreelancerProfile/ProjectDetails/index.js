import React from "react";
import GET_PROJECT from "./getProject";
import { useQuery } from "react-apollo";
import IndustryTag from "../../../components/IndustryTag";
import { Box, Text, Tag } from "@advisable/donut";
import Review from "../Review";

function ProjectDetails({ specialistId, projectId }) {
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: {
      specialist: specialistId,
      project: projectId,
    },
  });

  if (loading) return <>loading</>;

  const project = data.specialist.profileProject;

  return (
    <Box padding="xl">
      <IndustryTag industry={project.industry} mb="m" />
      <Box mb="m" width="80%">
        <Text
          as="h2"
          fontSize="28px"
          color="blue900"
          lineHeight="30px"
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          {project.title}
        </Text>
      </Box>
      <Text mb="xl" fontSize="m" color="neutral800" lineHeight="m">
        {project.description}
      </Text>
      <Box display={["block", "flex"]}>
        <Box width="100%" mb={["l", null]}>
          <Text
            mb="xs"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Skills Used
          </Text>
          <Box>
            {project.skills.map(skill => (
              <Tag key={skill.id} mr="xxs" mb="xxs">
                {skill.name}
              </Tag>
            ))}
          </Box>
        </Box>
        <Box width="100%">
          <Text
            mb="xs"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Industries
          </Text>
          <Box>
            {project.industries.map(industry => (
              <Tag key={industry.id} mr="xxs" mb="xxs">
                {industry.name}
              </Tag>
            ))}
          </Box>
        </Box>
      </Box>
      {project.reviews.length > 0 && (
        <>
          <Box mt="xl" height={1} bg="neutral100" />
          <Review review={project.reviews[0]} />
        </>
      )}
    </Box>
  );
}

export default ProjectDetails;
