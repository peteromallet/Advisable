import React from "react";
import * as Sentry from "@sentry/react";
import { useImage } from "react-image";
import { Link, Box, Text } from "@advisable/donut";
import { StyledLineClamp } from "@guild/views/Events/styles";
import styled from "styled-components";
import css from "@styled-system/css";
import Card from "./Card";

const StyledCoverImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
  transform: scale(2);
`;

function CoverImage({ coverPhoto }) {
  const { src } = useImage({ srcList: coverPhoto });
  return <StyledCoverImage src={src} />;
}

const StyledAvatar = styled.img`
  z-index: 1;
  border-radius: 12px;
  border: 2px solid white;
  width: 42px;
  height: 62px;
  object-fit: cover;
  pointer-events: none;
`;

function Avatar({ avatar }) {
  const { src } = useImage({ srcList: avatar });
  return <StyledAvatar src={src} />;
}

export default function Project({ caseStudy }) {
  return (
    <Sentry.ErrorBoundary>
      <Card as={Link} to={caseStudy.path}>
        <Box display="flex" css={css({ columnGap: 4 })}>
          <Box
            position="relative"
            bg="neutral100"
            width="120px"
            minWidth="120px"
            height="92px"
            borderRadius="12px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            css={`
              overflow: hidden;
            `}
          >
            {Boolean(caseStudy.coverPhoto) && (
              <Sentry.ErrorBoundary>
                <CoverImage coverPhoto={caseStudy.coverPhoto} />
              </Sentry.ErrorBoundary>
            )}
            {Boolean(caseStudy.specialist?.avatar) && (
              <Avatar avatar={caseStudy.specialist?.avatar} />
            )}
          </Box>
          <Box paddingY={0.5}>
            <Text
              fontSize="xs"
              color="neutral500"
              fontWeight={450}
              lineHeight="xs"
              mb={1}
            >
              {caseStudy.specialist?.name}
            </Text>
            <StyledLineClamp
              lines={3}
              color="neutral900"
              lineHeight="s"
              fontWeight={450}
            >
              {caseStudy.title}
            </StyledLineClamp>
          </Box>
        </Box>
      </Card>
    </Sentry.ErrorBoundary>
  );
}
