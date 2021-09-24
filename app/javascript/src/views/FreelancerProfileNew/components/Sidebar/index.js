import React from "react";
import { matchPath, useParams } from "react-router";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { LinkedinIn } from "@styled-icons/fa-brands/LinkedinIn";
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
} from "./styles";
import BackButton from "../BackButton";
// CTA button
import EditInfo from "../EditInfo";
import MessageButton from "../MessageButton";
import WorkTogetherButton from "../WorkTogetherButton";

export default function Sidebar({ data, ...props }) {
  const bio = data.specialist.bio.slice(0, 140);
  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });

  const viewer = useViewer();
  const params = useParams();
  const viewerIsGuild = viewer?.guild || false;
  const isOwner = viewer?.id === params.id;

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
              <CoverImage src={data.specialist.coverPhoto} size="collapse" />
            </Box>
          ) : null}
          <ProfilePicture specialist={data.specialist} />
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
            {data.specialist.name}
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
              {data.specialist.location}
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
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={["column", "row", "row", "column"]}
            alignItems={{ _: "center", l: "flex-start" }}
          >
            {isOwner ? (
              <EditInfo specialist={data.specialist}>Edit Info</EditInfo>
            ) : null}
            {!isOwner && !viewerIsGuild ? (
              <WorkTogetherButton id={data.specialist?.id}>
                Work together
              </WorkTogetherButton>
            ) : null}
            {!isOwner && viewerIsGuild ? (
              <MessageButton specialist={data.specialist} />
            ) : null}
            <Box>
              {data.specialist.linkedin ? (
                <SocialIcon icon={LinkedinIn} href={data.specialist.linkedin} />
              ) : null}
              {data.specialist.website ? (
                <SocialIcon icon={Globe} href={data.specialist.website} />
              ) : null}
            </Box>
          </Box>
        </StyledBioWrapper>
      </StyledStickySidebar>
    </Box>
  );
}
