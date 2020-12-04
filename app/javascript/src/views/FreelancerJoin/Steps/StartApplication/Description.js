import React from "react";
import { Box, Text, useBreakpoint } from "@advisable/donut";
import { Tag, MapPin, DollarSign } from "@styled-icons/feather";
import { lowerFirst } from "lodash-es";

function InfoTag({ title, icon: Icon, value }) {
  return (
    <Box display="flex" alignItems="center" mb={[2.5, 0]}>
      <Box
        bg="cyan100"
        color="neutral900"
        display="flex"
        width={["28px", "40px"]}
        height={["28px", "40px"]}
        alignItems="center"
        justifyContent="center"
        borderRadius={[8, 12]}
      >
        <Icon size={18} strokeWidth={2} />
      </Box>
      <Box
        ml={3}
        display="flex"
        flexDirection={["row", "column"]}
        justifyContent="space-between"
        width={["100%", "auto"]}
      >
        <Text fontSize={["sm", "xs"]} color="neutral500" lineHeight="xs">
          {title}
        </Text>
        <Text fontSize={["sm", 17]} color="neutral900" lineHeight="xs">
          {value}
        </Text>
      </Box>
    </Box>
  );
}

function WithProjectDetails({ project }) {
  const isWideScreen = useBreakpoint("sUp");
  const {
    user,
    skills,
    primarySkill,
    industry,
    estimatedBudget,
    specialistDescription,
    goals,
    remote,
  } = project;
  const location = remote
    ? "remote"
    : [user.city, user.country].filter(Boolean).join(", ");

  const generatedDescription = `${user?.companyName || ""} is hiring a ${
    primarySkill?.name || ""
  } specialist to ${lowerFirst(goals?.[0]) || ""}`;
  const description = specialistDescription || generatedDescription;

  return (
    <>
      <Text as="h2" fontSize={["3xl", "4xl"]} mb={[3, 5]} color="neutral900">
        {user.companyName} is looking for a{" "}
        {primarySkill?.name || skills[0].name} specialist and we think
        you&apos;re a great fit!
      </Text>
      <Box
        flexDirection={["column", "row"]}
        py={4}
        mb={[0, 5]}
        display="flex"
        justifyContent="space-between"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={["white", "neutral100"]}
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
      {isWideScreen ? (
        <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
          {description}
        </Text>
      ) : null}
    </>
  );
}

function NoProjectDetails() {
  const isWideScreen = useBreakpoint("sUp");
  return (
    <>
      <Text as="h2" fontSize={["3xl", "4xl"]} mb={2} color="neutral900">
        Apply to join our network of top freelancers
      </Text>
      {isWideScreen ? (
        <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
          Enter your details now to get started.
        </Text>
      ) : null}
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
