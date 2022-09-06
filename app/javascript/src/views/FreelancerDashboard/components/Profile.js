import React from "react";
import pluralize from "pluralize";
import css from "@styled-system/css";
import { Box, Skeleton, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import useViewer from "src/hooks/useViewer";
import Availability from "./Availability";
import { Link } from "react-router-dom";

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

export default function Hero({
  loading,
  caseStudies,
  reviews,
  unavailableUntil,
}) {
  const viewer = useViewer();

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
          <Link to={viewer.profilePath} className="mb-1">
            <div className="text-2xl font-semibold tracking-tight hover:underline text-neutral900 decoration-blue200">
              {viewer.name}
            </div>
          </Link>
          {loading ? (
            <LoadingReviewsAndCaseStudies />
          ) : (
            <ReviewsAndCaseStudies
              caseStudies={caseStudies}
              reviews={reviews}
            />
          )}
          <Availability loading={loading} unavailableUntil={unavailableUntil} />
        </Box>
      </Box>
    </>
  );
}
