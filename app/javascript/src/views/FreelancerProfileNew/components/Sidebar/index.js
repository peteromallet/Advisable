import React from "react";
import { matchPath, useParams } from "react-router";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { LinkedinIn } from "@styled-icons/fa-brands/LinkedinIn";
import { Globe } from "@styled-icons/heroicons-solid/Globe";
import { Button, Box, Text, Link } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import SocialIcon from "../SocialIcon";
import CoverImage from "../CoverImage";
import {
  StyledStickySidebar,
  StyledAvatarWrapper,
  StyledNameWrapper,
  StyledBioWrapper,
} from "./styles";

export default function Sidebar({ data, ...props }) {
  const bio = data.specialist.bio.slice(0, 140);
  const params = useParams();
  const id = params?.id;
  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });

  return (
    <Box
      position="relative"
      mt={!isArticle && { _: "-24px", m: "-40px", l: "-108px", xl: "-148px" }}
    >
      <StyledStickySidebar layout={["s", "s", "m", "l"]} {...props}>
        <StyledAvatarWrapper>
          {isArticle ? (
            <Box position="relative">
              <Box position="absolute" left="0" top="0" zIndex="2">
                <Link to={`/freelancers/${id}`}>Go to profile</Link>
              </Box>
              <CoverImage src={data.specialist.coverPhoto} size="collapse" />
            </Box>
          ) : null}
          <PassportAvatar
            size={isArticle ? "lg" : ["lg", "lg", "xl", "xl", "2xl"]}
            name={data.specialist.name}
            src={data.specialist.avatar}
            marginBottom={4}
            marginTop={isArticle && 18}
          />
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
            <Button
              variant="dark"
              width={["100%", "auto"]}
              size={["m", "m", "l"]}
              mb={[4, 0, 0, 6]}
            >
              Work together
            </Button>
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
