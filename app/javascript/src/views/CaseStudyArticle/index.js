import React from "react";
import { Helmet } from "react-helmet";
import { useArticle } from "./queries";
import Loading from "src/components/Loading";
import ErrorBoundary from "src/components/ErrorBoundary";
import NotFound, { isNotFound } from "src/views/NotFound";
import SidebarCard from "./components/SidebarCard";
import ArticleIntro from "./components/ArticleIntro";
import ArticleContent from "./components/ArticleContent";

export default function ShortlistArticle() {
  const { data, loading, error } = useArticle();

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <ErrorBoundary>
      {data?.caseStudy && (
        <Helmet>
          <title>Advisable | {data.caseStudy?.title}</title>
        </Helmet>
      )}
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
