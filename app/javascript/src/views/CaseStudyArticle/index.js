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
import ScrollTip from "./components/ScrollTip";

const SectionWrapper = ({ children, className }) => (
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
  >
    {children}
  </div>
);

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
      <div className="pt-10 pb-64">
        <SectionWrapper className="items-start">
          <SpecialistCard specialist={data.caseStudy.specialist} />
          <SpecialistBar specialist={data.caseStudy.specialist} />
          <ArticleIntro caseStudy={data.caseStudy} />
        </SectionWrapper>
        <hr className="border-neutral200 pb-[3px] mb-20" />
        <SectionWrapper>
          <ArticleContent caseStudy={data.caseStudy} />
        </SectionWrapper>
      </div>
      <ScrollTip />
    </ErrorBoundary>
  );
}
