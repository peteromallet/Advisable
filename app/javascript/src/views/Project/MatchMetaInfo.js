import React from "react";
import { Globe } from "@styled-icons/ionicons-outline";
import { LinkedinWithCircle } from "@styled-icons/entypo-social";
import { Stack, Box, Text, Link } from "@advisable/donut";

function SocialLink({ icon, children, ...props }) {
  return (
    <Link.External
      fontSize="sm"
      variant="dark"
      rel="nofollow"
      target="_blank"
      {...props}
    >
      <Box display="inline-block" mr={2}>
        {React.cloneElement(icon, { size: 20 })}
      </Box>
      {children}
    </Link.External>
  );
}

export default function MatchMetaInfo({ match }) {
  return (
    <>
      <Text
        fontSize="3xl"
        color="neutral900"
        marginBottom="4px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        {match.specialist.name}
      </Text>
      <Text
        fontSize="sm"
        fontWeight="light"
        color="neutral600"
        marginBottom="24px"
      >
        {match.specialist.location}
      </Text>
      <Box height="1px" bg="neutral200" mb={4} />
      <Stack spacing="xl" divider="neutral200" mb={4}>
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="sm" color="blue900">
            Hourly rate
          </Text>
          <Text fontSize="sm" color="neutral700">
            ${match.rate}
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="sm" color="blue900">
            Available to start
          </Text>
          <Text fontSize="sm" color="neutral700">
            {match.availability}
          </Text>
        </Box>
        {match.specialist.website && (
          <SocialLink href={match.specialist.website} icon={<Globe />}>
            Website
          </SocialLink>
        )}
        {match.specialist.linkedin && (
          <SocialLink
            href={match.specialist.linkedin}
            icon={<LinkedinWithCircle />}
          >
            Linkedin
          </SocialLink>
        )}
      </Stack>
    </>
  );
}
