import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Map } from "@styled-icons/heroicons-outline/Map";
import {
  Box,
  Text,
  useBreakpoint,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import ProfilePicture from "../ProfilePicture";
import {
  StyledStickySidebar,
  StyledAvatarWrapper,
  StyledNameWrapper,
  StyledBioWrapper,
  StyledShowMore,
} from "./styles";
// CTA button
import EditInfo from "../EditInfo";
import SocialProfilesIcons from "../SocialProfilesIcons";
// Constant values
import { SPECIALIST_BIO_LENGTH } from "src/constants";
import Button from "src/components/Button";
import ConnectModal from "src/components/ConnectModal";

function Sidebar({ data, isOwner, ...props }) {
  const [searchParams] = useSearchParams();
  const modal = useModal({ visible: searchParams.get("prompt") === "true" });
  const mUp = useBreakpoint("mUp");

  const { specialist } = data;

  const [isExpanded, setExpanded] = useState(false);
  const bioIsExceed = specialist.bio?.length > SPECIALIST_BIO_LENGTH;
  const bio = isExpanded
    ? specialist.bio
    : specialist.bio?.slice(0, SPECIALIST_BIO_LENGTH);

  return (
    <Box position="relative">
      <StyledStickySidebar {...props}>
        <StyledAvatarWrapper>
          <ProfilePicture isOwner={isOwner} specialist={specialist} />
        </StyledAvatarWrapper>
        <StyledNameWrapper>
          <Text
            to={specialist.profilePath}
            fontSize={{ _: "2xl", m: "5xl" }}
            fontWeight={600}
            color="neutral900"
            lineHeight={{ _: "24px", m: "32px" }}
            letterSpacing="-0.028em"
            marginBottom={{ xs: 0.5, m: 1.5 }}
          >
            {specialist.name}
          </Text>
          {Boolean(specialist.location) && (
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
          )}
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
            <Box mb={[4, 0, 0, 10]} width={{ _: "100%", s: "auto" }}>
              {isOwner && (
                <EditInfo specialist={specialist}>Edit Info</EditInfo>
              )}
              {!isOwner && !specialist.unavailableUntil && (
                <>
                  <DialogDisclosure {...modal}>
                    {(disclosure) => (
                      <Button
                        className="w-full sm:w-auto"
                        size={mUp ? "lg" : "md"}
                        {...disclosure}
                      >
                        Talk with {specialist.firstName}
                      </Button>
                    )}
                  </DialogDisclosure>
                  <ConnectModal modal={modal} specialist={specialist} />
                </>
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
