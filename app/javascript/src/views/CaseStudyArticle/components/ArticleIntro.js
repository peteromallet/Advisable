import React from "react";
import ConnectButton from "src/components/ConnectButton";
import CompanyBox from "./CompanyBox";
import Achievements from "./Achievements";
import AdvisableComment from "./AdvisableComment";
import SpecialistCompanyRelation from "./SpecialistCompanyRelation";
import Availability from "./Availability";

const Title = ({ children }) => (
  <h1
    id="caseStudyArticleTitle"
    className={`
        text-neutral800
          font-extrabold
          tracking-tight
          mb-7
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
          xl:text-5xl
          xl:pt-0.5
          xl:pb-0.5
      `}
  >
    {children}
  </h1>
);

const SpecialistInfo = ({ specialist }) => (
  <div
    id="specialistInfo"
    className="flex lg:hidden items-center flex-col mx-auto"
  >
    <div className="font-bold text-2xl text-center text-neutral800 hover:text-neutral800 leading-none pt-px pb-[3px] mb-1 hover:underline decoration-neutral500">
      {specialist.name}
    </div>
    <Availability unavailableUntil={specialist.unavailableUntil} />
    <ConnectButton
      className="mt-5 mb-8 w-[184px]"
      specialist={specialist}
      size="md"
    >
      Connect
    </ConnectButton>
    <hr className="w-20 pb-[3px] mb-7" />
  </div>
);

export default function ArticleIntro({ caseStudy }) {
  return (
    <div id="caseStudyIntro" className="pb-24">
      <SpecialistCompanyRelation
        company={caseStudy.company}
        specialist={caseStudy.specialist}
      />
      <SpecialistInfo specialist={caseStudy.specialist} />
      <Title>{caseStudy.title}</Title>
      <CompanyBox caseStudy={caseStudy} />
      <AdvisableComment caseStudy={caseStudy} />
      <Achievements sections={caseStudy.sections} />
    </div>
  );
}
