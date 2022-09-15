import React from "react";
import { Helmet } from "react-helmet";
import StickyBox from "react-sticky-box";
import { useLocation, useNavigate } from "react-router-dom";
import { useBackground, useModal } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
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
import FavoriteButton from "src/views/Explore/FavoriteButton";
import ShareArticleButton from "./components/ShareArticleButton";
import EditCaseStudyButton from "./components/EditCaseStudyButton";
import CircularButton from "src/components/CircularButton";
import ConnectModal from "src/components/ConnectModal";
import { X } from "@styled-icons/heroicons-solid";
import { useArticle } from "./queries";
import ScrollIndicator from "./components/ScrollIndicator";
import SpecialistBar from "./components/SpecialistBar";
import SimilarArticles from "./components/SimilarArticles";

export default function CaseStudyArticle() {
  useBackground("white");
  const viewer = useViewer();
  const { data, loading, error } = useArticle();
  const location = useLocation();
  const navigate = useNavigate();
  const { backgroundLocation } = location.state || {};
  const contactModal = useModal();

  if (loading && !data) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const article = data?.caseStudy;
  const { specialist } = article;
  const isOwner = viewer?.id === specialist.id;

  const scrollToTop = () => {
    let el = document.getElementById("article-scrollable-area");
    el?.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      {data?.caseStudy && (
        <Helmet>
          <title>Advisable | {data.caseStudy?.title}</title>
        </Helmet>
      )}
      {data?.caseStudy && <ArticleEvents article={data?.caseStudy} />}
      <ConnectModal
        modal={contactModal}
        specialist={specialist}
        article={article}
      />
      <div className="relative">
        <div
          className="sticky z-20"
          style={{
            top: backgroundLocation ? 0 : 68,
          }}
        >
          <div
            data-testid="action-buttons-bar"
            className="inline-flex absolute top-3 right-3 z-10 gap-2 p-2 ml-auto bg-white rounded-full lg:flex-col-reverse"
          >
            <ShareArticleButton slug={data.caseStudy.slug} />
            <EditCaseStudyButton article={data.caseStudy} />
            <FavoriteButton article={data.caseStudy} />
            {backgroundLocation && (
              <CircularButton
                aria-label="Close modal"
                icon={X}
                onClick={() => navigate(backgroundLocation)}
              />
            )}
          </div>
        </div>

        <div className="flex relative px-6 pb-0 mx-auto w-full lg:px-10 xl:px-14 xl:max-w-[1320px]">
          <div className="hidden pt-12 pr-12 lg:block xl:pr-16 shrink-0 w-[280px] xl:w-[320px]">
            <StickyBox
              offsetTop={backgroundLocation ? 60 : 116}
              offsetBottom={60}
            >
              <SpecialistSection
                article={data.caseStudy}
                modal={contactModal}
                isOwner={isOwner}
              />
            </StickyBox>
          </div>
          <div className="flex relative flex-col py-3 w-full border-solid lg:pl-12 lg:border-l xl:pl-16 border-neutral100">
            {!location.state?.signupPrompt && <ScrollIndicator />}

            <div className="pt-10 pb-20">
              <SpecialistBar
                modal={contactModal}
                specialist={data.caseStudy.specialist}
                isOwner={isOwner}
              />
              <h1 className="mb-5 font-serif text-3xl tracking-tight md:text-4xl font-[800] text-blue900 max-w-[680px]">
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
                !location.state?.signupPrompt && (
                  <>
                    <ArticleContent caseStudy={data.caseStudy} />
                    <SimilarArticles
                      articles={data.caseStudy.similar}
                      onClick={scrollToTop}
                    />
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </ErrorBoundary>
  );
}
