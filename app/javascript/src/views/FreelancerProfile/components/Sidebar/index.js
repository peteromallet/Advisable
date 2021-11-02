import PropTypes from "prop-types";
import React, { useState } from "react";
import css from "@styled-system/css";
import { matchPath, useParams } from "react-router";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { Box, Text, Link } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import ProfilePicture from "../ProfilePicture";
import ProfilePictureArticle from "../ProfilePictureArticle";
import CoverImage from "../CoverImage";
import {
  StyledStickySidebar,
  StyledArticleAvatarWrapper,
  StyledAvatarWrapper,
  StyledNameWrapper,
  StyledBioWrapper,
  StyledShowMore,
} from "./styles";
import BackButton from "../BackButton";
// CTA button
import EditInfo from "../EditInfo";
import ConnectButton from "src/components/ConnectButton";
import SocialProfilesIcons from "../SocialProfilesIcons";
// Constant values
import { TRUNCATE_LIMIT } from "../../values";

function Sidebar({ data, isOwner, ...props }) {
  const params = useParams();
  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:username/case_studies/:case_study_id",
  });

  const viewer = useViewer();
  const params = useParams();
  const isOwner = viewer?.id === params.id;
  const { specialist } = data;

  const [isExpanded, setExpanded] = useState(false);
  const bioIsExceed = specialist.bio?.length > TRUNCATE_LIMIT;
  const bio = isExpanded
    ? specialist.bio
    : specialist.bio?.slice(0, TRUNCATE_LIMIT);

  return (
    <Box position="relative">
      <StyledStickySidebar {...props}>
        {isArticle ? (
          <StyledArticleAvatarWrapper>
            <Box position="relative">
              <BackButton>Go to profile</BackButton>
              <CoverImage src={specialist.coverPhoto} size="collapse" />
            </Box>
            <ProfilePictureArticle specialist={specialist} />
          </StyledArticleAvatarWrapper>
        ) : (
          <StyledAvatarWrapper>
            <ProfilePicture isOwner={isOwner} specialist={specialist} />
          </StyledAvatarWrapper>
        )}
        <StyledNameWrapper>
          <Text
            as={isArticle && Link}
            to={`/freelancers/${params.username}`}
            fontSize={{ _: "2xl", m: "5xl" }}
            fontWeight={600}
            color="neutral900"
            lineHeight={{ _: "24px", m: "32px" }}
            letterSpacing="-0.028em"
            marginBottom={{ xs: 0.5, m: 1.5 }}
            css={
              isArticle &&
              css({
                "&:hover": {
                  color: "neutral900",
                  textDecoration: "underline",
                },
              })
            }
          >
            {specialist.name}
          </Text>
          <Box display="flex" color="neutral500" alignItems="center">
            <Box flexShrink={0}>
              <Map height="20px" width="20px" />
            </Box>
            <Text
              $truncate
              fontSize={{ _: "s", m: "l" }}
              letterSpacing="-0.016em"
              color="neutral600"
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
            marginBottom={7}
          >
            {bio}
            {bioIsExceed && (
              <StyledShowMore onClick={() => setExpanded((e) => !e)}>
                {isExpanded ? <>see&#160;less</> : <>see&#160;more</>}
              </StyledShowMore>
            )}
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={["column", "row", "row", "column"]}
            alignItems={{ _: "center", l: "flex-start" }}
          >
            <Box mb={[4, 0, 0, 10]} width="100%">
              {isOwner && (
                <EditInfo specialist={specialist}>Edit Info</EditInfo>
              )}
              {!isOwner && (
                <ConnectButton
                  specialist={specialist}
                  variant="dark"
                  width={["100%", "auto"]}
                  size={["m", "m", "l"]}
                >
                  Work together
                </ConnectButton>
              )}
            </Box>
            <SocialProfilesIcons isOwner={isOwner} specialist={specialist} />
          </Box>
        </StyledBioWrapper>
      </StyledStickySidebar>
    </Box>
  );
}

Sidebar.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default Sidebar;
