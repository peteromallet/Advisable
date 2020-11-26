import React from "react";
import { Box, Text } from "@advisable/donut";
import { Tag, MapPin, DollarSign } from "@styled-icons/feather";
import { lowerFirst } from "lodash-es";

function InfoTag({ title, icon: Icon, value }) {
  return (
    <Box display="flex" alignItems="center">
      <Box
        bg="cyan100"
        color="neutral900"
        display="flex"
        width="40px"
        height="40px"
        alignItems="center"
        justifyContent="center"
        borderRadius={12}
      >
        <Icon size={18} strokeWidth={2} />
      </Box>
      <Box ml={3}>
        <Text fontSize="xs" color="neutral500" lineHeight="xs">
          {title}
        </Text>
        <Text fontSize={17} color="neutral900" lineHeight="xs">
          {value}
        </Text>
      </Box>
    </Box>
  );
}

function WithProjectDetails({ project }) {
  const {
    user,
    primarySkill,
    industry,
    estimatedBudget,
    goals,
    remote,
  } = project;
  const location = remote
    ? "remote"
    : [user.city, user.country].filter(Boolean).join(", ");
  return (
    <>
      <Text as="h2" fontSize="4xl" mb={7} color="neutral900" lineHeight="2xl">
        {" "}
        {user.companyName} is looking for a {primarySkill.name} specialist and
        we think you&apos;re a great fit!
      </Text>
      <Box
        py={4}
        mb={5}
        display="flex"
        justifyContent="space-between"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="neutral100"
      >
        {industry ? (
          <InfoTag title="Industry" value={industry} icon={Tag} />
        ) : null}
        {location ? (
          <InfoTag title="Location" value={location} icon={MapPin} />
        ) : null}
        {estimatedBudget ? (
          <InfoTag title="Budget" value={estimatedBudget} icon={DollarSign} />
        ) : null}
      </Box>
      <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
        {user.companyName} is hiring a {primarySkill.name} specialist to{" "}
        {lowerFirst(goals[0])}
      </Text>
    </>
  );
}

function NoProjectDetails() {
  return (
    <>
      <Text as="h2" fontSize="4xl" mb="xs" color="neutral900">
        Apply to join our network of top freelancers
      </Text>
      <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
        Join our network of freelancers and Per lectus magnis etiam malesuada
        accumsan suscipit convallis luctus cursus semper porta mollis
      </Text>
    </>
  );
}

export default function Description({ project }) {
  return project ? (
    <WithProjectDetails project={project} />
  ) : (
    <NoProjectDetails />
  );
}
