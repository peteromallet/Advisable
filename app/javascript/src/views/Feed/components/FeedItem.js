import React from "react";
import { Link, useLocation } from "react-router-dom";
import InterestIcon from "./InterestIcon";
import { withErrorBoundary } from "react-error-boundary";
import Avatar from "src/components/Avatar";
import Favicon from "src/components/Favicon";
import FavoriteArticleButton from "./FavoriteArticleButton";
import { extractResult } from "../utilities";

function Attribute({ label, value }) {
  return (
    <div>
      <h5 className="text-[11px] uppercase text-neutral500 tracking-wider font-medium leading-none mb-1">
        {label}
      </h5>
      <p className="text-sm leading-normal font-inter text-neutral900">
        {value}
      </p>
    </div>
  );
}

const Availability = ({ unavailableUntil }) => {
  const color = unavailableUntil ? "bg-neutral600" : "bg-blue500";
  return (
    <div className="flex items-center justify-items-center">
      <div className={`h-[6px] w-[6px] ${color} rounded-full mr-1`} />
      <div className="pr-2 text-sm leading-none font-inter text-neutral600 line-clamp-1">
        {unavailableUntil ? "Unavailable for hire" : "Available to hire"}
      </div>
    </div>
  );
};

function ArticleResults({ article }) {
  const results = article.resultsContent?.results || [];

  if (results.length === 0) {
    return (
      <p className="line-clamp-3 font-inter text-sm md:text-[15px] md:leading-relaxed text-neutral-600">
        {article.subtitle}
      </p>
    );
  }

  return (
    <div>
      <h5 className="mb-3 text-xs font-semibold leading-none uppercase text-neutral500">
        Results
      </h5>
      <ul className="space-y-2">
        {results.map((result, index) => (
          <li
            key={result}
            className="flex align-start gap-2 font-inter text-[15px] text-neutral800"
          >
            <div className="flex-shrink-0 w-5 h-5 text-xs font-semibold rounded-full bg-blue100 text-blue800 grid place-items-center">
              {index + 1}
            </div>
            {extractResult(result)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeedItem({ article, interest }) {
  const location = useLocation();

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div
      className="bg-white rounded-[32px] shadow-feed p-6 md:p-8 flex flex-col lg:flex-row gap-10 items-start"
      data-walkthrough="feed-item"
    >
      <div>
        <div
          className="flex items-center mb-4 gap-3"
          data-walkthrough="feed-item-author"
        >
          <Avatar
            src={article.specialist.avatar}
            name={article.specialist.name}
          />
          <div className="flex flex-col gap-1">
            <div className="text-[18px] font-medium leading-none">
              {article.specialist.name}
            </div>
            <Availability
              unavailableUntil={article.specialist.unavailableUntil}
            />
          </div>
          <FavoriteArticleButton
            size="sm"
            article={article}
            className="flex ml-auto lg:hidden"
          />
        </div>
        <Link
          to={`/articles/${article.slug || article.id}`}
          className="group"
          state={{
            backgroundLocation: location.state?.backgroundLocation || location,
          }}
        >
          <h3 className="block text-xl md:text-[24px] md:leading-8 font-[650] tracking-tight mb-5 text-neutral900 group-hover:underline">
            {article.title}
          </h3>
          <ArticleResults article={article} />
        </Link>

        <div className="flex items-center justify-between pt-6 flex-nowrap">
          {interest && (
            <Link
              onClick={scrollToTop}
              to={`/explore/${interest.id}`}
              className="border border-solid border-neutral200 rounded-full h-8 px-3 mr-2 inline-flex items-center gap-0.5 text-sm leading-none text-neutral600 hover:text-neutral900"
            >
              <InterestIcon
                primaryColor="var(--color-neutral600)"
                className="w-5 min-w-[20px] h-5"
              />
              <p className="line-clamp-1">{interest.term}</p>
            </Link>
          )}
          <FavoriteArticleButton
            size="sm"
            article={article}
            className="hidden lg:flex"
          />
        </div>
      </div>
      <div className="bg-neutral-100 p-5 rounded-[24px] w-full lg:w-[240px] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0">
            <Favicon src={article.company?.favicon} />
          </div>
          <div className="flex flex-col w-full min-w-0">
            <div className="min-w-0 pb-1 font-medium leading-none truncate">
              {article.company?.name || (
                <span className="text-neutral500">Company hidden</span>
              )}
            </div>
            <span className="min-w-0 text-xs leading-none truncate font-inter text-neutral500">
              {article.company?.website || "Website hidden"}
            </span>
          </div>
        </div>
        <div className="hidden pt-5 mt-5 border-t border-solid md:block border-neutral200 space-y-5">
          {article.industries.length > 0 && (
            <Attribute
              label="Industry"
              value={article.industries[0].industry.name}
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
