import React, { useState } from "react";
import { matchPath, useParams } from "react-router";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { Linkedin } from "@styled-icons/fa-brands/Linkedin";
import { Twitter } from "@styled-icons/fa-brands/Twitter";
import { Medium } from "@styled-icons/fa-brands/Medium";
import { Instagram } from "@styled-icons/fa-brands/instagram";
import { Globe } from "@styled-icons/heroicons-solid/Globe";
import useViewer from "src/hooks/useViewer";
import { Box, Text } from "@advisable/donut";

import ProfilePicture from "../ProfilePicture";
import SocialIcon from "../SocialIcon";
import CoverImage from "../CoverImage";
import {
  StyledStickySidebar,
  StyledAvatarWrapper,
  StyledNameWrapper,
  StyledBioWrapper,
  StyledShowMore,
} from "./styles";
import BackButton from "../BackButton";
// CTA button
import EditInfo from "../EditInfo";
import MessageButton from "../MessageButton";
import WorkTogetherButton from "../WorkTogetherButton";

export const TRUNCATE_LIMIT = 160;

export default function Sidebar({ data, ...props }) {
  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });

  const viewer = useViewer();
  const params = useParams();
  const viewerIsGuild = viewer?.guild || false;
  const isOwner = viewer?.id === params.id;
  const { specialist } = data;

  const [isExpanded, setExpanded] = useState(false);
  const bioIsExceed = specialist.bio.length > TRUNCATE_LIMIT;
  const bio = isExpanded ? specialist.bio : specialist.bio.slice(0, 160);

  return (
    <Box
      position="relative"
      mt={!isArticle && { _: "-24px", m: "-40px", l: "-108px", xl: "-148px" }}
    >
      <StyledStickySidebar layout={["s", "s", "m", "l"]} {...props}>
        <StyledAvatarWrapper>
          {isArticle ? (
            <Box position="relative">
              <BackButton>Go to profile</BackButton>
              <CoverImage src={specialist.coverPhoto} size="collapse" />
            </Box>
          ) : null}
          <ProfilePicture specialist={specialist} />
        </StyledAvatarWrapper>
        <StyledNameWrapper>
          <Text
            fontSize={{ _: "2xl", m: "5xl" }}
            fontWeight="semibold"
            color="neutral900"
            lineHeight="4xl"
            letterSpacing="-0.03rem"
            marginBottom={{ xs: 0.5, m: 1.5 }}
          >
            {specialist.name}
          </Text>
          <Box display="flex" color="neutral400" alignItems="center">
            <Map height="20px" width="20px" color="neutral500" />
            <Text
              fontSize={{ _: "s", m: "m" }}
              fontWeight="medium"
              color="neutral400"
              lineHeight="l"
              marginLeft={1}
            >
              {specialist.location}
            </Text>
          </Box>
        </StyledNameWrapper>
        <StyledBioWrapper>
          <Text
            fontSize={{ _: "m", m: "m" }}
            lineHeight="l"
            color="neutral700"
            mb={7}
          >
            {bio}
            {bioIsExceed ? (
              <StyledShowMore onClick={() => setExpanded((e) => !e)}>
                {isExpanded ? "see less" : "see more"}
              </StyledShowMore>
            ) : null}
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={["column", "row", "row", "column"]}
            alignItems={{ _: "center", l: "flex-start" }}
          >
            {isOwner ? (
              <EditInfo specialist={specialist}>Edit Info</EditInfo>
            ) : null}
            {!isOwner && !viewerIsGuild ? (
              <WorkTogetherButton id={specialist?.id}>
                Work together
              </WorkTogetherButton>
            ) : null}
            {!isOwner && viewerIsGuild ? (
              <MessageButton specialist={specialist} />
            ) : null}
            <Box>
              {specialist.linkedin ? (
                <SocialIcon icon={Linkedin} href={specialist.linkedin} />
              ) : null}
              {specialist.twitter ? (
                <SocialIcon icon={Twitter} href={specialist.twitter} />
              ) : null}
              {specialist.instagram ? (
                <SocialIcon icon={Instagram} href={specialist.instagram} />
              ) : null}
              {specialist.medium ? (
                <SocialIcon icon={Medium} href={specialist.medium} />
              ) : null}
              {specialist.website ? (
                <SocialIcon icon={Globe} href={specialist.website} />
              ) : null}
            </Box>
          </Box>
        </StyledBioWrapper>
      </StyledStickySidebar>
    </Box>
  );
}
