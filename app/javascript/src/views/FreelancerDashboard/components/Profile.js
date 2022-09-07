import React from "react";
import pluralize from "pluralize";
import { Link } from "react-router-dom";
import { Skeleton, useBreakpoint } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import composeStyles from "src/utilities/composeStyles";
import useViewer from "src/hooks/useViewer";

function ReviewsAndCaseStudies({ reviews, caseStudies }) {
  return (
    <div>
      <div className="text-neutral700 font-normal">
        <b className="text-neutral800 font-semibold">{caseStudies} </b>
        case {pluralize("study", caseStudies)}
      </div>
      <div className="text-neutral700 font-normal">
        <b className="text-neutral800 font-semibold">{reviews} </b>
        {pluralize("testimonial", reviews)}
      </div>
    </div>
  );
}

function LoadingReviewsAndCaseStudies() {
  return (
    <div className="py-1 space-y-2">
      <Skeleton width="100px" height="16px" />
      <Skeleton width="98px" height="16px" />
    </div>
  );
}

const profileClasses = composeStyles({
  base: `
    p-4
    flex sm:inline-flex
    min-w-[460px]
    gap-5
    cursor-pointer
    rounded-md
    ring-neutral200
    items-center
    transition-all
  `,
  variants: {
    mobile: `
      bg-white
      ring-1
      hover:drop-shadow
    `,
    desktop: `
      -m-4
      hover:bg-white
      hover:ring-1
    `,
  },
});

export default function Hero({ loading, caseStudies, reviews }) {
  const viewer = useViewer();
  const lUp = useBreakpoint("lUp");

  return (
    <Link
      to={viewer.profilePath}
      className={profileClasses({ mobile: !lUp, desktop: lUp })}
      title="Go to profile"
      aria-label="Go to profile"
    >
      <PassportAvatar
        src={viewer.avatar}
        name={viewer.name}
        size={{ _: "lg", l: "xl" }}
        className="pointer-events-none"
      />
      <div className="space-y-2">
        <div className="text-2xl font-semibold tracking-tight text-neutral900">
          {viewer.name}
        </div>
        {loading ? (
          <LoadingReviewsAndCaseStudies />
        ) : (
          <ReviewsAndCaseStudies caseStudies={caseStudies} reviews={reviews} />
        )}
      </div>
    </Link>
  );
}
