import React, { useState } from "react";
import { Box, Text, Card, theme } from "@advisable/donut";
import Avatar from "./Avatar";
import { LinkedinIn } from "@styled-icons/fa-brands";
import { Link as LinkIcon } from "@styled-icons/feather";
import IconLink from "./IconLink";
import CoverImage from "./CoverImage";
import RequestTalkButton from "./RequestTalkButton";
import EditInfo from "./EditInfo";
import { truncate } from "lodash-es";
import styled from "styled-components";

const TRUNCATE_LIMIT = 250;

const StyledBioExpander = styled.span`
  cursor: pointer;
  padding-right: 4px;
  border-radius: 4px;
  &:hover {
    color: ${theme.colors.blue700};
    background: ${theme.colors.blue50};
  }
`;

function AboutSection({ specialist, isOwner, viewer }) {
  const expandable = specialist.bio.length > TRUNCATE_LIMIT;
  const [expanded, setExpanded] = useState(!expandable);
  return (
    <Card
      minHeight="514px"
      bg="#fff"
      mt="m"
      p="12px 12px 18px 12px"
      borderRadius={12}
      mb="xl"
    >
      <CoverImage coverPhoto={specialist.coverPhoto} isOwner={isOwner} />
      <Box display="flex">
        <Avatar avatar={specialist.avatar} isOwner={isOwner} />
        <Box mt="20px" width="100%">
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
              {isOwner && (
                <EditInfo specialist={specialist}>Edit Info</EditInfo>
              )}
              {!isOwner && viewer && (
                <RequestTalkButton id={specialist.id}>
                  Request a talk
                </RequestTalkButton>
              )}
            </Box>
          </Box>
          <Text color="neutral800" lineHeight="22px" pr="58px">
            {expanded
              ? specialist.bio
              : truncate(specialist.bio, { length: TRUNCATE_LIMIT })}
            {expandable && (
              <Text
                as={StyledBioExpander}
                color="blue600"
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? " see\u00A0less" : " see\u00A0more"}
              </Text>
            )}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}

export default AboutSection;
