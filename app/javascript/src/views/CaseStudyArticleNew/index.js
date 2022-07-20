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
import { ChartBar } from "@styled-icons/heroicons-outline";
import Results from "./components/Results";
import SpecialistSection from "./components/SpecialistSection";

const SectionWrapper = ({ children, className, ...props }) => (
  <div
    className={`
          flex
          mx-auto
          px-6
          sm:px-8
          md:px-0
          lg:gap-10
          xl:gap-20
          w-full
          md:w-[696px]
          lg:w-[960px]
          xl:w-[1198px]
          ${className}
        `}
    {...props}
  >
    {children}
  </div>
);

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
          <div className="p-10 relative w-full border-solid border-neutral100 border-l">
            <h1 className="text-4xl font-semibold text-blue900">
              {data.caseStudy.title}
            </h1>
            <div className="flex gap-10">
              <div>
                <p>{data.caseStudy.subtitle}</p>
              </div>
              <div>
                <Results results={data.caseStudy.resultsContent?.results} />
                <CompanyDetails caseStudy={data.caseStudy} />
              </div>
            </div>
            <hr className="absolute bottom-0 left-0 w-[100vw] border-neutral100 " />
          </div>
        </div>
        <SectionWrapper id="content">
          <ArticleContent caseStudy={data.caseStudy} />
        </SectionWrapper>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
