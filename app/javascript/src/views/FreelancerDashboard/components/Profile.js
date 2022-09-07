import React from "react";
import pluralize from "pluralize";
import { Link } from "react-router-dom";
import { Skeleton } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
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

export default function Hero({ loading, caseStudies, reviews }) {
  const viewer = useViewer();

  return (
    <>
      <div className="flex w-full items-center lg:items-center gap-5">
        <PassportAvatar
          src={viewer.avatar}
          name={viewer.name}
          size={{ _: "lg", l: "xl" }}
        />
        <div className="space-y-2">
          <Link to={viewer.profilePath}>
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
        </div>
      </div>
    </>
  );
}
