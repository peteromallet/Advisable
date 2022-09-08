import React from "react";
import useViewer from "src/hooks/useViewer";
import CardSkeleton from "./CardSkeleton";
import CaseStudyCard from "./CaseStudyCard";

const PAGE_SIZE = 15;

export default function CaseStudyGrid({ loading, results, showSkill }) {
  const viewer = useViewer();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {results.map((result, i) => (
        <CaseStudyCard
          key={result.id}
          article={result}
          fadeIn={loading}
          delay={0.05 * (i % PAGE_SIZE)}
          showSkill={showSkill}
          blurred={!viewer && i > results.length - 4}
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
