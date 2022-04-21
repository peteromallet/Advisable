import React, { Suspense } from "react";
import { useImage } from "react-image";
import { Link } from "react-router-dom";
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
    <Suspense fallback={<LogoMarkFallback />}>
      <ErrorBoundary fallback={<LogoMarkFallback />}>
        <Img
          src={url}
          className="max-h-[40px] max-w-[52px] rounded-[8px]"
          data-a={url}
        />
      </ErrorBoundary>
    </Suspense>
  );
}

function Attribute({ label, value }) {
  return (
    <div>
      <h5 className="text-[11px] uppercase text-neutral500 tracking-wider font-medium leading-none mb-1">
        {label}
      </h5>
      <p className="font-inter text-sm text-neutral900 leading-normal">
        {value}
      </p>
    </div>
  );
}

function FeedItem({ article, interest }) {
  return (
    <div className="bg-white rounded-[32px] shadow-feed p-8 flex gap-10 items-start">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-[36px] h-[36px] bg-neutral200 rounded-full bg-cover"
            style={{ backgroundImage: `url(${article.specialist.avatar})` }}
          />
          <div className="flex flex-col gap-1">
            <div className="text-[17px] font-medium leading-none">
              {article.specialist.name}
            </div>
            {article.company && (
              <div className="text-neutral600 text-sm font-inter leading-none">
                with {article.company.name}
              </div>
            )}
          </div>
        </div>
        <Link to={`/articles/${article.slug}`} className="group">
          <h3 className="block text-xl md:text-[24px] md:leading-8 font-[560] tracking-tight mb-2.5 text-neutral900 group-hover:underline">
            {article.title}
          </h3>
          <p className="font-inter text-sm md:text-[15px] md:leading-relaxed text-neutral-600">
            {article.subtitle}
          </p>
        </Link>

        {interest && (
          <div className="pt-6">
            <Link
              to={`/explore/${interest.id}`}
              className="border border-solid border-neutral200 rounded-full h-8 px-3 inline-flex items-center gap-0.5 leading-none text-neutral600 hover:text-neutral900"
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
      <div className="bg-neutral-100 p-5 rounded-[24px] w-[240px] flex-shrink-0">
        <div className="space-y-5">
          {article.company && (
            <div className="flex items-center gap-2.5 border-b border-solid border-neutral200 pb-5">
              <div className="flex-shrink-0">
                <Favicon url={article.company.favicon} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="truncate font-medium leading-none pb-1">
                  {article.company.name}
                </div>
                <span className="truncate text-xs font-inter leading-none text-neutral500">
                  {article.company.website}
                </span>
              </div>
            </div>
          )}
          {article.industries.length > 0 && (
            <Attribute
              label="Industry"
              value={article.industries.map((i) => i.industry.name).join(", ")}
            />
          )}

          {article.companyType && (
            <Attribute label="Type" value={article.companyType} />
          )}

          {article.company?.businessType && (
            <Attribute label="Focus" value={article.company.businessType} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(FeedItem, {
  fallback: <React.Fragment />,
});
