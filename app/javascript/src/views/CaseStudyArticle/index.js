import React from "react";
import { useArticle } from "./queries";
import Loading from "src/components/Loading";
import ErrorBoundary from "src/components/ErrorBoundary";
import SidebarCard from "./components/SidebarCard";
import ArticleIntro from "./components/ArticleIntro";
import ArticleContent from "./components/ArticleContent";

export default function ShortlistArticle() {
  const { data, loading, error } = useArticle();
  if (loading) return <Loading />;

  console.log("data", data);

  return (
    <ErrorBoundary>
      <div>
        <div className="flex gap-20 items-start">
          <SidebarCard specialist={data.caseStudy.specialist} />
          <ArticleIntro caseStudy={data.caseStudy} />
        </div>
        <hr />
        <ArticleContent caseStudy={data.caseStudy} />
      </div>
    </ErrorBoundary>
  );
}
