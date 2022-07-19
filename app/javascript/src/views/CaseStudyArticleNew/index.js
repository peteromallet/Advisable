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
      <div className="pt-10 pb-36">
        <hr className="border-neutral200 pb-[3px] my-20" />
        <SectionWrapper id="content">
          <ArticleContent caseStudy={data.caseStudy} />
        </SectionWrapper>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
