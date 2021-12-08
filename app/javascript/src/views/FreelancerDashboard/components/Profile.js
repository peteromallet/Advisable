import React from "react";
import pluralize from "pluralize";
import css from "@styled-system/css";
import {
  Box,
  Skeleton,
  Text,
  Modal,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import useViewer from "src/hooks/useViewer";
import styled from "styled-components";

const StyledAvailabilityButton = styled.div`
  ${css({
    display: "inline",
    position: "relative",
    border: "2px solid",
    borderColor: "neutral200",
    borderRadius: "12px",
    lineHeight: "16px",
    paddingY: 1.5,
    fontSize: "sm",
    color: "neutral600",
    paddingLeft: 8,
    paddingRight: 3,
  })}

  &::before {
    content: "";
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 12px;
    height: 12px;
    background-color: green;
    border-radius: 50%;
  }
`;

function ReviewsAndCaseStudies({ reviews, caseStudies }) {
  return (
    <Box display="flex" flexWrap="wrap" mb={3} css={css({ columnGap: 5 })}>
      <Text lineHeight="m" color="neutral700" fontWeight={350}>
        <Text as="span" fontWeight={520} color="neutral900">
          {caseStudies}
        </Text>{" "}
        <Text as="span" fontWeight={420}>
          case {pluralize("study", caseStudies)}
        </Text>
      </Text>
      <Text lineHeight="m" color="neutral700" fontWeight={350}>
        <Text as="span" fontWeight={520} color="neutral900">
          {reviews}
        </Text>{" "}
        <Text as="span" fontWeight={420}>
          {pluralize("testimonial", reviews)}
        </Text>
      </Text>
    </Box>
  );
}

function LoadingReviewsAndCaseStudies() {
  return (
    <Box display="flex" flexWrap="wrap" mb={3} css={css({ columnGap: 5 })}>
      <Skeleton width="100px" height="18px" my={0.5} />
      <Skeleton width="98px" height="18px" my={0.5} />
    </Box>
  );
}

export default function Hero({ loading, caseStudies, reviews }) {
  const viewer = useViewer();
  const modal = useModal();

  return (
    <>
      <Box
        display="flex"
        width="100%"
        alignItems={{ _: "start", l: "center" }}
        css={css({ columnGap: 5 })}
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
            letterSpacing="-0.02rem"
            mb={1}
          >
            {viewer.name}
          </Text>
          {loading ? (
            <LoadingReviewsAndCaseStudies />
          ) : (
            <ReviewsAndCaseStudies
              caseStudies={caseStudies}
              reviews={reviews}
            />
          )}
          <Modal modal={modal}>Some modal</Modal>
          <DialogDisclosure as={StyledAvailabilityButton} {...modal}>
            <span>Available for projects</span>
          </DialogDisclosure>
        </Box>
      </Box>
    </>
  );
}
