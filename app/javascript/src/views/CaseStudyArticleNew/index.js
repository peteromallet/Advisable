import React from "react";
import { Helmet } from "react-helmet";
import StickyBox from "react-sticky-box";
import { useLocation, useNavigate } from "react-router-dom";
import { useBackground, useModal } from "@advisable/donut";
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
import ConnectModal from "src/components/ConnectModal";
import { X } from "@styled-icons/heroicons-solid";
import { useArticle } from "./queries";
import ScrollIndicator from "./components/ScrollIndicator";
import SpecialistBar from "./components/SpecialistBar";

export default function CaseStudyArticle() {
  useBackground("beige");
  const { data, loading, error } = useArticle();
  const location = useLocation();
  const navigate = useNavigate();
  const { backgroundLocation } = location.state || {};
  const contactModal = useModal();

  if (loading && !data) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const article = data?.caseStudy;
  const { specialist } = article;

  return (
    <ErrorBoundary>
      {data?.caseStudy && (
        <Helmet>
          <title>Advisable | {data.caseStudy?.title}</title>
        </Helmet>
      )}
      {data?.caseStudy && <ArticleEvents article={data?.caseStudy} />}
      <div className="inline-flex absolute top-3 right-3 z-10 gap-2 p-2 bg-white rounded-full">
        <ScrollIndicator />
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
      <ConnectModal
        modal={contactModal}
        specialist={specialist}
        article={article}
      />
      <div className="flex px-6 pb-36 mx-auto w-full lg:px-10 xl:px-14 xl:max-w-[1320px]">
        <div className="hidden pt-12 pr-6 lg:block xl:pr-12 min-w-[272px] w-[272px] xl:min-w-[348px] xl:w-[348px]">
          <StickyBox offsetTop={60} offsetBottom={60}>
            <SpecialistSection article={data.caseStudy} modal={contactModal} />
          </StickyBox>
        </div>
        <div className="relative py-20 w-full border-solid lg:pl-6 lg:border-l xl:pl-12 border-neutral100">
          <SpecialistBar
            modal={contactModal}
            specialist={data.caseStudy.specialist}
          />
          <h1 className="mb-4 font-serif text-3xl tracking-tight md:text-4xl font-[800] text-blue900 max-w-[720px]">
            {data.caseStudy.title}
          </h1>
          <div className="gap-14 md:flex">
            <div>
              <p className="mb-10 leading-7 text-neutral900">
                {data.caseStudy.subtitle}
              </p>
              <KeyTakeaways insights={data.caseStudy.insights} />
            </div>
            <div className="pt-2 shrink-0 md:w-[280px]">
              <Results results={data.caseStudy.resultsContent?.results} />
              <CompanyDetails caseStudy={data.caseStudy} />
            </div>
          </div>
          <hr className="my-16" id="article-content-start" />
          {loading ? (
            <Loading />
          ) : (
            <ArticleContent caseStudy={data.caseStudy} />
          )}
        </div>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
