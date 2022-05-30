import React from "react";
import { useModal, DialogDisclosure } from "@advisable/donut";
import CompanyBox from "./CompanyBox";
import Achievements from "./Achievements";
import AdvisableComment from "./AdvisableComment";
import SpecialistCompanyRelation from "./SpecialistCompanyRelation";
import Availability from "./Availability";
import ScrollTip from "./ScrollTip";
import useViewer from "src/hooks/useViewer";
import TestimonialRequest from "./TestimonialRequest";
import Testimonial from "./Testimonial";
import ConnectModal from "src/components/ConnectModal";
import Button from "src/components/Button";

const Title = ({ children }) => (
  <h1
    id="caseStudyArticleTitle"
    className={`
        text-neutral800
          font-bold
          tracking-tight
          mb-8
          text-3xl 
          leading-none
          pt-[3px]
          pb-px
          sm:text-3xl 
          sm:leading-8
          sm:pt-px
          sm:pb-[3px]
          md:text-4xl
          md:leading-none
          xl:text-[44px]
          xl:leading-[48px]
      `}
  >
    {children}
  </h1>
);

const SpecialistInfo = ({ specialist }) => {
  const modal = useModal();

  return (
    <div
      id="specialistInfo"
      className="flex lg:hidden items-center flex-col mx-auto"
    >
      <div className="font-bold text-2xl text-center text-neutral800 hover:text-neutral800 leading-none pt-px pb-[3px] mb-1 hover:underline decoration-neutral500">
        {specialist.name}
      </div>
      <Availability unavailableUntil={specialist.unavailableUntil} />
      {!specialist.unavailableUntil && (
        <>
          <ConnectModal modal={modal} specialist={specialist} />
          <DialogDisclosure {...modal}>
            {(disclosure) => (
              <Button className="mt-5 mb-8 w-[184px]" {...disclosure}>
                Talk with {specialist.firstName}
              </Button>
            )}
          </DialogDisclosure>
        </>
      )}
      <hr className="w-20 pb-[3px] mb-7" />
    </div>
  );
};

export default function ArticleIntro({ caseStudy }) {
  const viewer = useViewer();
  const showComment = !viewer?.isSpecialist && !caseStudy.review;
  const showTestimonialRequest = viewer?.isSpecialist && !caseStudy.review;

  return (
    <div id="caseStudyIntro">
      <SpecialistCompanyRelation
        company={caseStudy.company}
        specialist={caseStudy.specialist}
      />
      <SpecialistInfo specialist={caseStudy.specialist} />
      <Title>{caseStudy.title}</Title>
      <CompanyBox caseStudy={caseStudy} />
      <Testimonial review={caseStudy.review} className="mb-8" />
      {showTestimonialRequest && (
        <TestimonialRequest
          id={caseStudy.id}
          specialistId={caseStudy.specialist.id}
        />
      )}
      {showComment && <AdvisableComment caseStudy={caseStudy} />}
      <Achievements sections={caseStudy.sections} />
      <ScrollTip />
    </div>
  );
}
