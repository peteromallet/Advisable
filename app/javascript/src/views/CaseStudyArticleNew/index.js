import React from "react";
import { Helmet } from "react-helmet";
import StickyBox from "react-sticky-box";
import { useLocation, useNavigate } from "react-router-dom";
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
import FavoriteArticleButton from "src/views/Feed/components/FavoriteArticleButton";
import ShareArticleButton from "./components/ShareArticleButton";
import EditCaseStudyButton from "./components/EditCaseStudyButton";
import CircularButton from "src/components/CircularButton";
import { X } from "@styled-icons/heroicons-solid";
import { useArticle } from "./queries";

export default function CaseStudyArticle() {
  useBackground("beige");
  const { data, loading, error } = useArticle();
  const location = useLocation();
  const navigate = useNavigate();
  const { backgroundLocation } = location.state || {};

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
      <div className="z-10 absolute right-0 top-0 inline-flex gap-2 p-5">
        <EditCaseStudyButton article={data.caseStudy} />
        <ShareArticleButton slug={data.caseStudy.slug} />
        <FavoriteArticleButton article={data.caseStudy} />
        {backgroundLocation && (
          <CircularButton
            aria-label="Close modal"
            icon={X}
            onClick={() => navigate(backgroundLocation)}
          />
        )}
      </div>
      <div className="pb-36 relative">
        <div className="flex mx-auto w-full xl:w-[1320px]">
          <div className="p-14 min-w-[348px] w-[348px]">
            <StickyBox offsetTop={60} offsetBottom={60}>
              <SpecialistSection article={data.caseStudy} />
            </StickyBox>
          </div>
          <div className="pl-12 pr-14 py-11 relative w-full border-solid border-neutral100 border-l">
            <h1 className="text-4xl font-serif font-[800] tracking-tight text-blue900 mb-4 max-w-[720px]">
              {data.caseStudy.title}
            </h1>
            <div className="flex gap-14">
              <div>
                <p className="leading-7 text-neutral900 mb-10">
                  {data.caseStudy.subtitle}
                </p>
                <KeyTakeaways insights={data.caseStudy.insights} />
              </div>
              <div className="pt-2">
                <Results results={data.caseStudy.resultsContent?.results} />
                <CompanyDetails caseStudy={data.caseStudy} />
              </div>
            </div>
            <hr className="my-16" />
            <ArticleContent caseStudy={data.caseStudy} />
          </div>
        </div>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
