import React from "react";
import * as Sentry from "@sentry/react";
import Testimonial from "src/components/Testimonial";

export default function Testimonials({ review }) {
  if (!review) return null;

  return (
    <Sentry.ErrorBoundary>
      <div className="pt-12 mb-12 border-t border-solid border-neutral100">
        <h4 className="mb-5 text-2xl font-medium tracking-tight">Review</h4>
        <Testimonial review={review} />
      </div>
    </Sentry.ErrorBoundary>
  );
}
