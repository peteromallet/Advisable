import React from 'react';

export default function ExploreViewHeading({ title, description, loading }) {
 return (
      <div className="mb-8">
        <div className="mb-1">
          {loading ? (
            <div className="max-w-[250px] h-[32px] bg-neutral-200 animate-pulse rounded-md mb-5" />
          ) : (
            <h1 className="text-4xl font-bold tracking-tight text-neutral900">{title}</h1>
          )}
        </div>
        {loading ? (
          <div className="max-w-[420px] h-[18px] bg-neutral-200 animate-pulse rounded-md" />
        ) : (
          <p className="text-lg text-neutral-500">{description}</p>
        )}
      </div>
 )
}
