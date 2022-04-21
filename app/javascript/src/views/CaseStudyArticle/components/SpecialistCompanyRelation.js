import React, { Suspense } from "react";
import { useImage } from "react-image";
import { useBreakpoint } from "@advisable/donut";
import { PlusSm } from "@styled-icons/heroicons-solid";
import SuperEllipse from "react-superellipse";
import LogoMark from "src/components/LogoMark";
import PassportAvatar from "src/components/PassportAvatar";
import { ErrorBoundary } from "react-error-boundary";

function Img({ src: url, ...props }) {
  const { src } = useImage({ srcList: url });
  return <img src={src} {...props} />;
}

function LogoMarkFallback() {
  return <LogoMark color="blue" size="16" />;
}

function Favicon({ url }) {
  if (!url) {
    return <LogoMarkFallback />;
  }

  return (
    <Suspense fallback={null}>
      <ErrorBoundary fallback={<LogoMarkFallback />}>
        <Img
          src={url}
          className="rounded w-8 h-8 lg:w-6 lg:h-6 object-contain"
          data-a={url}
        />
      </ErrorBoundary>
    </Suspense>
  );
}

export default function SpecialistCompanyRelation({ specialist, company }) {
  const isDesktop = useBreakpoint("lUp");

  return (
    <div className="flex relative items-center mb-4 lg:mb-6 justify-center lg:justify-start">
      <PassportAvatar
        src={specialist.avatar}
        size={isDesktop ? "sm" : "lg"}
        name={specialist.name}
      />
      <div className="flex items-center justify-center shadow p-px rounded-full bg-white w-[28px] lg:w-[22px] h-[28px] lg:h-[22px] -mx-1.5 lg:-mx-1 z-[1]">
        <PlusSm />
      </div>
      <SuperEllipse
        r1={0.1}
        r2={0.362}
        className="flex bg-gray-200 w-[84px] h-[96px] lg:w-[42px] lg:h-[48px] items-center justify-center"
      >
        <Favicon url={company?.favicon} />
      </SuperEllipse>
    </div>
  );
}
