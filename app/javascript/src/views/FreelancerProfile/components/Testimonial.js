import React from "react";
import * as Sentry from "@sentry/react";
import { Avatar } from "@advisable/donut";

function TestimonialQuoteIcon(props) {
  return (
    <svg width={24} height={24} fill="none" {...props}>
      <path
        d="M20.566 17.458c1.887-2.048 1.697-4.678 1.691-4.708v-8a1 1 0 00-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 001 1h3.078a2.89 2.89 0 01-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16v2.82h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0c1.888-2.048 1.697-4.678 1.691-4.708v-8a1 1 0 00-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 001 1h3.078a2.89 2.89 0 01-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16v2.82h1c2.783 0 4.906-.771 6.309-2.292z"
        fill="#5E6D9F"
        fillOpacity={0.4}
      />
    </svg>
  );
}

export default function Testimonial({ review, className }) {
  if (!review) return null;

  return (
    <Sentry.ErrorBoundary>
      <div className={`bg-[#F3F1F0] rounded-lg relative p-5 ${className}`}>
        <div className="absolute right-5 top-5">
          <TestimonialQuoteIcon />
        </div>
        <div className="flex items-center mb-4 gap-3">
          <Avatar
            bg="blue100"
            color="blue300"
            size="s"
            display="inline-flex"
            name={review.name}
            url={review.avatar}
          />
          <div>
            <div className="mb-1 text-lg tracking-tight leading-6 font-semibold text-neutral900">
              {review.name}
            </div>
            <div className="text-sm text-neutral800 leading-none">
              {review.companyName}
            </div>
          </div>
        </div>

        <p className="italic text-neutral800 text-lg">
          &quot;{review.comment}&quot;
        </p>
      </div>
    </Sentry.ErrorBoundary>
  );
}
