import React from "react";
import { useQuery } from "@apollo/client";
import { Modal, Avatar, Box, Text, Tag, Paragraph } from "@advisable/donut";
import GET_PROJECT from "./getProject";
import IndustryTag from "../IndustryTag";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import Review from "components/Review";
import ProjectDetailsLoading from "./ProjectDetailsLoading";

function PreviousProjectDetails({ id }) {
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: {
      id: id,
    },
  });

  if (loading) return <ProjectDetailsLoading />;

  const project = data.previousProject;

  return (
    <>
      {project.industry && (
        <IndustryTag industry={project.primaryIndustry} mb="s" />
      )}
      <Box mb="m" width="80%">
        <Text
          as="h2"
          fontSize="4xl"
          color="neutral900"
          lineHeight="30px"
          fontWeight="medium"
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
          <Text mb="1px" color="neutral900" fontWeight="medium">
            {project.specialist.name}
          </Text>
          <Text mt="1px" color="neutral500" fontSize="s">
            {project.specialist.location}
          </Text>
        </Box>
      </Box>
      <Box height={1} bg="neutral100" mb="l" />
      <Text
        mb="xs"
        fontSize="lg"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        Project description
      </Text>
      <Paragraph mb="xl">{renderLineBreaks(project.description)}</Paragraph>
      <Box display={["block", "flex"]}>
        <Box width="100%" mb="xl">
          <Text
            mb="xs"
            fontSize="lg"
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.01em"
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
            fontSize="lg"
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.01em"
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
          <Box height={1} bg="neutral100" marginBottom="xl" />
          <Review review={project.reviews[0]} />
        </>
      )}
    </>
  );
}

PreviousProjectDetails.Modal = ({ modal, id, ...props }) => {
  return (
    <Modal modal={modal} width={800} padding="xl" {...props}>
      <PreviousProjectDetails id={id} />
    </Modal>
  );
};

export default PreviousProjectDetails;
