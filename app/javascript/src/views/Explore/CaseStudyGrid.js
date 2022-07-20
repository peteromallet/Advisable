import React from "react";
import CardSkeleton from "./CardSkeleton";
import CaseStudyCard from "./CaseStudyCard";

const PAGE_SIZE = 15;

export default function CaseStudyGrid({ loading, results }) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6">
      {results.map((result, i) => (
        <CaseStudyCard
          key={result.id}
          article={result}
          fadeIn={loading}
          delay={0.05 * (i % PAGE_SIZE)}
        />
      ))}
      {loading && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
    </div>
  );
}
