import { BadgeCheck } from "@styled-icons/heroicons-solid";
import React from "react";
import CopyURL from "src/components/CopyURL";

export default function TestimonialRequest({ id, specialistId }) {
  return (
    <div className="px-4 xl:px-6 py-4 xl:py-6 bg-neutral50 rounded-[20px] xl:rounded-lg ring-neutral200 ring-1 ring-inset mb-8">
      <div className="flex gap-3 mb-5 sm:mb-4">
        <div className="w-10 min-w-[2.5rem] h-10 p-2.5 bg-blue100 rounded-full flex items-center justify-center">
          <BadgeCheck className="fill-blue500" />
        </div>
        <div>
          <h4 className="text-base xl:text-lg text-neutral900 font-semibold tracking-tight leading-none xl:leading-5 mb-1.5 sm:mb-1">
            Verify this project and include a testimonial
          </h4>
          <p className="font-inter text-base leading-5 xl:leading-6 text-neutral900">
            Send this link to the client to verify this project and get a
            testimonial for your work.
          </p>
        </div>
      </div>
      <CopyURL bg="white">{`${location.origin}/review/${specialistId}/case_studies/${id}`}</CopyURL>
    </div>
  );
}
