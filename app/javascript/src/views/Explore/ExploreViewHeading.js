import React from 'react';
import BackButton from 'src/components/BackButton';

export default function ExploreViewHeading({ back, title, description, loading, children }) {
  return (
    <div className="flex my-8 items-center gap-4">
      {back && (
        <div className="flex shrink-0">
          <BackButton to={back} />
        </div>
      )}
      <div className="flex-1">
        {loading ? (
          <div className="max-w-[250px] h-[24px] bg-neutral-200 animate-pulse rounded-md mt-2 mb-4" />
        ) : (
          <h1 className="text-2xl md:text-3xl leading-none mb-1.5 font-bold tracking-tight text-neutral900 sentence-case">{title}</h1>
        )}
        {loading ? (
          <div className="max-w-[420px] h-[16px] bg-neutral-200 animate-pulse rounded-md" />
        ) : (
          <p className="md:text-lg text-neutral-600">{description}</p>
        )}
      </div>
      <div className="shrink-0">
        {children}
      </div>
    </div>
  )
}
