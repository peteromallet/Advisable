import React from "react";
import { Helmet } from "react-helmet";
import { useArticle } from "./queries";
import { useBackground } from "@advisable/donut";
import Loading from "src/components/Loading";
import ErrorBoundary from "src/components/ErrorBoundary";
import NotFound, { isNotFound } from "src/views/NotFound";
import ArticleContent from "./components/ArticleContent";
import ArticleEvents from "./components/ArticleEvents";
import Footer from "src/components/Footer";
import CompanyDetails from "./components/CompanyDetails";
import Results from "./components/Results";
import SpecialistSection from "./components/SpecialistSection";
import KeyTakeaways from "./components/KeyTakeaways";

export default function CaseStudyArticle() {
  useBackground("beige");
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
      {data?.caseStudy && <ArticleEvents article={data?.caseStudy} />}
      <div className="pb-36">
        <div className="flex mx-auto w-full xl:w-[1320px]">
          <SpecialistSection article={data.caseStudy} />
          <div className="pl-12 pr-15 py-12 relative w-full border-solid border-neutral100 border-l">
            <h1 className="text-4xl font-bold text-blue900 mb-4">
              {data.caseStudy.title}
            </h1>
            <div className="flex gap-10">
              <div>
                <p className="leading-7 text-neutral900 mb-10">
                  {data.caseStudy.subtitle}
                </p>
                <KeyTakeaways />
              </div>
              <div>
                <Results results={data.caseStudy.resultsContent?.results} />
                <CompanyDetails caseStudy={data.caseStudy} />
              </div>
            </div>
            <hr className="absolute bottom-0 left-0 w-[100vw] border-neutral100 " />
          </div>
        </div>
        <div className="flex mx-auto w-full xl:w-[1320px]">
          <ArticleContent caseStudy={data.caseStudy} />
        </div>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
