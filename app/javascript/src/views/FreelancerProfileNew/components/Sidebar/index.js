import React from "react";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { LinkedinIn } from "@styled-icons/fa-brands/LinkedinIn";
import { Globe } from "@styled-icons/heroicons-solid/Globe";
import { Button, Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import SocialIcon from "../SocialIcon";
import {
  StyledStickySidebar,
  StyledNameWrapper,
  StyledBioWrapper,
} from "./styles";

export default function Sidebar({ data }) {
  const bio = data.specialist.bio.slice(0, 140);

  return (
    <Box
      position="relative"
      mt={{ _: "-44px", m: "-60px", l: "-128px", xl: "-176px" }}
    >
      <StyledStickySidebar layout={["s", "s", "m", "l"]}>
        <PassportAvatar
          size={["lg", "lg", "xl", "xl", "2xl"]}
          name={data.specialist.name}
          src={data.specialist.avatar}
          marginBottom={4}
          // stroke="true"
          stroke="12px"
        />
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
              fontSize={{ _: "s", m: "17px" }}
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
            fontSize={{ _: "m", m: "l" }}
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
