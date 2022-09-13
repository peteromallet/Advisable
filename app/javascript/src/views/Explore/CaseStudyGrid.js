import React, { useMemo } from "react";
import { useBreakpoint } from "src/../../../donut/src";
import useViewer from "src/hooks/useViewer";
import CardSkeleton from "./CardSkeleton";
import CaseStudyCard from "./CaseStudyCard";

const PAGE_SIZE = 15;

export default function CaseStudyGrid({ loading, results, showSkill }) {
  const viewer = useViewer();
  const isTablet = useBreakpoint("mUp");
  const isLarge = useBreakpoint("lUp");

  const columns = useMemo(() => {
    if (isLarge) return 3;
    if (isTablet) return 2;
    return 1;
  }, [isTablet, isLarge]);

  const articles = useMemo(() => {
    if (viewer) return results;
    return results.slice(0, results.length - (results.length % columns));
  }, [viewer, columns, results]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {articles.map((result, i) => (
        <CaseStudyCard
          key={result.id}
          article={result}
          fadeIn={loading}
          delay={0.05 * (i % PAGE_SIZE)}
          showSkill={showSkill}
          blurred={!viewer && i > articles.length - (columns + 1)}
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
