import React from "react";
import BackButton from "src/components/BackButton";

export default function ExploreViewHeading({
  back,
  title,
  description,
  loading,
  children,
}) {
  return (
    <div className="flex gap-4 items-center mt-8 mb-6">
      {back && (
        <div className="flex shrink-0">
          <BackButton to={back} />
        </div>
      )}
      <div className="flex-1">
        {loading ? (
          <div className="mt-2 mb-3 rounded-md animate-pulse max-w-[250px] h-[24px] bg-neutral-200" />
        ) : (
          <h1 className="text-2xl font-bold tracking-tight leading-none md:text-3xl text-neutral900 sentence-case">
            {title}
          </h1>
        )}
        {loading ? (
          <div className="rounded-md animate-pulse max-w-[420px] h-[16px] bg-neutral-200" />
        ) : (
          <p className="md:text-lg text-neutral-600">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
