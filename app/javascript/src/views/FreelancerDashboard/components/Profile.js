import React from "react";
import pluralize from "pluralize";
import css from "@styled-system/css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import useViewer from "src/hooks/useViewer";

const StyledLink = styled(Link)(
  css({
    color: "blue500",
    fontSize: "m",
    fontWeight: 450,
    "&:hover": {
      color: "blue700",
    },
  }),
);

export default function Hero({ caseStudies, reviews }) {
  const viewer = useViewer();

  return (
    <>
      <Box
        display="flex"
        width="100%"
        alignItems={{ _: "start", l: "center" }}
        css={css({ columnGap: 4 })}
      >
        <PassportAvatar
          src={viewer.avatar}
          name={viewer.name}
          size={{ _: "lg", l: "xl" }}
        />
        <Box>
          <Text
            fontSize="3xl"
            fontWeight={550}
            color="neutral900"
            lineHeight="l"
            mb={1}
          >
            {viewer.name}
          </Text>
          <Box
            display="flex"
            flexWrap="wrap"
            mb={6}
            css={css({ columnGap: 5 })}
          >
            <Text lineHeight="m" color="neutral700" fontWeight={350}>
              <Text as="span" fontWeight={450}>
                {caseStudies.length}
              </Text>{" "}
              case {pluralize("study", caseStudies.length)}
            </Text>
            <Text lineHeight="m" color="neutral700" fontWeight={350}>
              <Text as="span" fontWeight={450}>
                {reviews.length}
              </Text>{" "}
              {pluralize("testimonial", reviews.length)}
            </Text>
          </Box>
          <StyledLink to="/profile" size="s">
            Update profile
          </StyledLink>
        </Box>
      </Box>
    </>
  );
}
