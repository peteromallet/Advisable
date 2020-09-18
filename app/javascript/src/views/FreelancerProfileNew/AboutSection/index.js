import React from "react";
import { Circle, Box, Text, Card, Button, Link } from "@advisable/donut";
import Avatar from "./Avatar";
import useViewer from "src/hooks/useViewer";
import { LinkedinIn } from "@styled-icons/fa-brands";
import { Link as LinkIcon } from "@styled-icons/feather";
import IconLink from "./IconLink";

function AboutSection({ specialist }) {
  console.log("specialist", specialist);
  const viewer = useViewer();
  const isOwner = viewer.id === specialist.id;
  console.log("viewer about section", viewer);
  return (
    <Card minHeight="514px" bg="#fff" mt="m" p="12px" borderRadius={12} mb="l">
      <Box
        as="img"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/92b19080680791.5ce7e63751fcd.jpg"
        css="object-fit: cover;"
        width="100%"
        bg="neutral50"
        height="300px"
        mx="auto"
        borderRadius={12}
      />
      <Box display="flex">
        <Avatar avatar={specialist.avatar} />
        <Box mt="m">
          <Box display="flex">
            <Box>
              <Text
                fontSize={36}
                fontWeight="medium"
                color="neutral900"
                mb="xxs"
              >
                {specialist.name}
              </Text>
              <Text color="neutral600" fontSize={17} mb="xs" lineHeight="140%">
                {specialist.location}
              </Text>
            </Box>
            <Box display="flex" alignItems="flex-start" ml="auto" mr="m">
              {specialist.linkedin && (
                <IconLink url={specialist.linkedin} Icon={LinkedinIn} />
              )}
              {specialist.website && (
                <IconLink
                  url={specialist.website}
                  Icon={LinkIcon}
                  strokeWidth={2}
                />
              )}
              {isOwner ? (
                <Button variant="subtle" mx="xxs">
                  Edit Info
                </Button>
              ) : (
                <Button>Get in touch</Button>
              )}
            </Box>
          </Box>
          <Text color="neutral800" lineHeight="22px" pr="58px">
            {specialist.bio}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}

export default AboutSection;
