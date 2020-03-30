import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link as RouterLink } from "react-router-dom";
import { Link, Avatar, Box, Text, Tag } from "@advisable/donut";
import GET_PROJECT from "./getProject";
import IndustryTag from "../../../components/IndustryTag";
import Review from "../Review";
import ProjectDetailsLoading from "./ProjectDetailsLoading";

function ProjectDetails({ specialistId, projectId }) {
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: {
      specialist: specialistId,
      project: projectId,
    },
  });

  if (loading) return <ProjectDetailsLoading />;

  const project = data.specialist.profileProject;

  return (
    <>
      {project.industry && <IndustryTag industry={project.industry} mb="s" />}
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
      <Box height={1} bg="neutral100" mb="m" />
      <Box mb="m" display="flex" alignItems="center">
        <Box flexShrink={0} mr="s">
          <Avatar
            size="s"
            name={project.specialist.name}
            url={project.specialist.avatar}
          />
        </Box>
        <Box>
          <Link
            mb="1px"
            as={RouterLink}
            color="blue700"
            to={`/freelancers/${specialistId}`}
            fontWeight="medium"
          >
            {project.specialist.name}
          </Link>
          <Text mt="1px" color="neutral500" fontSize="s">
            {project.specialist.location}
          </Text>
        </Box>
      </Box>
      <Box height={1} bg="neutral100" mb="l" />
      <Text mb="xs" color="blue900" fontWeight="medium" letterSpacing="-0.02em">
        Project description
      </Text>
      <Text mb="xl" fontSize="m" color="neutral800" lineHeight="m">
        {project.description}
      </Text>
      <Box display={["block", "flex"]}>
        <Box width="100%" mb="xl">
          <Text
            mb="xs"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Skills Used
          </Text>
          <Box>
            {project.skills.map((skill) => (
              <Tag key={skill.id} mr="xxs" mb="xxs">
                {skill.name}
              </Tag>
            ))}
          </Box>
        </Box>
        <Box width="100%" mb="xl">
          <Text
            mb="xs"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Industries
          </Text>
          <Box>
            {project.industries.map((industry) => (
              <Tag key={industry.id} mr="xxs" mb="xxs">
                {industry.name}
              </Tag>
            ))}
          </Box>
        </Box>
      </Box>
      {project.reviews.length > 0 && (
        <>
          <Box height={1} bg="neutral100" />
          <Box mb="xl">
            <Review review={project.reviews[0]} />
          </Box>
        </>
      )}
    </>
  );
}

export default ProjectDetails;
