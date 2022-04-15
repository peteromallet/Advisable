import React, { Suspense } from "react";
import { useImage } from "react-image";
import { Link } from "react-router-dom";
import { PlusSm } from "@styled-icons/heroicons-solid";
import LogoMark from "src/components/LogoMark";
import InterestIcon from "./InterestIcon";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";

function Img({ src: url, ...props }) {
  const { src } = useImage({ srcList: url });
  return <img src={src} {...props} />;
}

function LogoMarkFallback() {
  return <LogoMark color="subtle" size="16" />;
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
          className="w-full h-full rounded-xs object-cover"
          data-a={url}
        />
      </ErrorBoundary>
    </Suspense>
  );
}

function FeedItem({ article, interest }) {
  return (
    <div className="py-7 md:py-11">
      <div className="mb-5 flex gap-3">
        <div className="flex items-center">
          <div
            className="w-8 h-9 bg-neutral200 rounded-xs bg-cover -mr-1.5"
            style={{ backgroundImage: `url(${article.specialist.avatar})` }}
          />
          <div className="w-5 h-5 bg-white rounded-full shadow grid place-items-center z-[5]">
            <PlusSm className="w-4 h-4 text-neutral800" />
          </div>
          <div className="w-8 h-9 bg-neutral200 rounded-xs -ml-1.5 grid place-items-center">
            <Favicon url={article.company?.favicon} />
          </div>
        </div>
        <div className="leading-none">
          <div className="font-[560] mb-0.5 text-neutral900">
            {article.specialist.name}
          </div>
          <div className="font-inter text-neutral600 text-sm">
            with {article.company?.name}
          </div>
        </div>
      </div>

      <Link to={`/articles/${article.slug}`} className="group flex gap-11">
        <div>
          <h3 className="block text-xl md:text-[1.6rem] md:leading-8 font-[560] tracking-tight mb-2 text-neutral900 group-hover:underline">
            {article.title}
          </h3>
          <p className="font-inter text-sm md:text-base md:leading-relaxed text-neutral-600">
            {article.subtitle}
          </p>
        </div>

        {article.firstImage && (
          <div
            className="hidden lg:block w-[180px] h-[120px] bg-neutral200 shrink-0 rounded-md"
            style={{
              background: `url(${article.firstImage.url}) no-repeat center center / cover`,
            }}
          />
        )}
      </Link>

      {interest && (
        <div className="pt-6">
          <Link
            to={`/explore/${interest.id}`}
            className="inline-flex items-center gap-0.5 leading-none text-neutral600 hover:text-neutral900"
          >
            <InterestIcon
              primaryColor="var(--color-neutral600)"
              className="w-5 h-5"
            />
            {interest.term}
          </Link>
        </div>
      )}
    </div>
  );
}

export default withErrorBoundary(FeedItem, {
  fallback: <React.Fragment />,
});
