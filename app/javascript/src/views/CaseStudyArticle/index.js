import React from "react";
import { Helmet } from "react-helmet";
import { useArticle } from "./queries";
import Loading from "src/components/Loading";
import ErrorBoundary from "src/components/ErrorBoundary";
import NotFound, { isNotFound } from "src/views/NotFound";
import SpecialistCard from "./components/SpecialistCard";
import ArticleIntro from "./components/ArticleIntro";
import ArticleContent from "./components/ArticleContent";
import SpecialistBar from "./components/SpecialistBar";

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
      <div className="w-[1198px] pt-10 pb-24 mx-auto flex gap-20 items-start">
        <SpecialistCard specialist={data.caseStudy.specialist} />
        <SpecialistBar specialist={data.caseStudy.specialist} />
        <ArticleIntro caseStudy={data.caseStudy} />
      </div>
      <hr className="border-neutral200 pb-[3px]" />
      <div className="w-[1198px] pb-10 pt-20 mx-auto">
        <ArticleContent caseStudy={data.caseStudy} />
      </div>
    </ErrorBoundary>
  );
}
