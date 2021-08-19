import React from "react";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { LinkedinIn } from "@styled-icons/fa-brands/LinkedinIn";
import { Globe } from "@styled-icons/heroicons-solid/Globe";
import { Button, Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import { StyledPassportAvatar } from "src/components/PassportAvatar/styles";
import SocialIcon from "../SocialIcon";
import styled from "styled-components";
import { variant } from "styled-system";

const StyledNameWrapper = styled.div``;
const StyledBioWrapper = styled.div``;

const grid = variant({
  prop: "layout",
  variants: {
    l: {
      gridTemplateRows: "auto",
      gridTemplateColumns: "auto",
      width: "280px",
      marginRight: 4,
      [StyledPassportAvatar]: {
        gridRow: "1",
      },
      [StyledNameWrapper]: {
        gridRow: "2",
        gridColumn: "1",
      },
      [StyledBioWrapper]: {
        gridRow: "3",
        gridColumn: "1",
      },
    },
    m: {
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "auto auto",
      width: "auto",
      [StyledPassportAvatar]: {
        gridRow: "1 / last-line",
      },
      [StyledNameWrapper]: {
        gridRow: "1",
        gridColumn: "2",
      },
      [StyledBioWrapper]: {
        gridRow: "2",
        gridColumn: "2",
      },
    },
    s: {
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "auto 1fr",
      width: "auto",
      [StyledPassportAvatar]: {
        gridRow: "1",
      },
      [StyledNameWrapper]: {
        gridRow: "1",
        gridColumn: "2",
      },
      [StyledBioWrapper]: {
        gridRow: "2",
        gridColumn: "1 / last-column",
      },
    },
  },
});

const StickySidebar = styled(Box)`
  ${grid}
  display: grid;

  position: sticky;
  top: 108px;
`;

export default function Sidebar({ data }) {
  const bio = data.specialist.bio.slice(0, 140);

  return (
    <Box position="relative" mt={{ xs: "-64px", l: "-128px", xl: "-176px" }}>
      <StickySidebar layout={["s", "s", "m", "l"]}>
        <PassportAvatar
          size={["lg", "lg", "xl", "xl", "2xl"]}
          name={data.specialist.name}
          src={data.specialist.avatar}
          marginBottom={4}
        />
        <StyledNameWrapper>
          <Text
            fontSize="5xl"
            fontWeight="semibold"
            color="neutral900"
            lineHeight="4xl"
            letterSpacing="-0.03rem"
            marginBottom={1.5}
          >
            {data.specialist.name}
          </Text>
          <Box display="flex" color="neutral400" alignItems="center" mb={4}>
            <Map height="20px" width="20px" color="neutral500" />
            <Text
              fontSize="17px"
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
          <Text fontSize="l" lineHeight="l" color="neutral700" mb={7}>
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
      </StickySidebar>
    </Box>
  );
}
