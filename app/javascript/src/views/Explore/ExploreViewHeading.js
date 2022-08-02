import React from 'react';
import BackButton from 'src/components/BackButton';

export default function ExploreViewHeading({ back, title, description, loading, children }) {
  return (
    <div className="flex mb-8 items-center">
      {back && (
        <div className="flex shrink-0 mr-4">
          <BackButton to={back} />
        </div>
      )}
      <div className="flex-1">
        {loading ? (
          <div className="max-w-[250px] h-[24px] bg-neutral-200 animate-pulse rounded-md mt-10 mb-4" />
        ) : (
          <h1 className="text-3xl font-bold tracking-tight text-neutral900 sentence-case">{title}</h1>
        )}
        {loading ? (
          <div className="max-w-[420px] h-[16px] bg-neutral-200 animate-pulse rounded-md" />
        ) : (
          <p className="text-lg text-neutral-500">{description}</p>
        )}
      </div>
      <div className="shrink-0">
        {children}
      </div>
    </div>
  )
}
