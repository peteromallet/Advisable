import React from "react";
import { Link, useLocation } from "react-router-dom";
import InterestIcon from "./InterestIcon";
import { withErrorBoundary } from "react-error-boundary";
import Avatar from "src/components/Avatar";
import Favicon from "src/components/Favicon";
import FavoriteArticleButton from "./FavoriteArticleButton";

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

const Availability = ({ unavailableUntil }) => {
  const color = unavailableUntil ? "bg-neutral600" : "bg-blue500";
  return (
    <div className="flex justify-items-center items-center">
      <div className={`h-[6px] w-[6px] ${color} rounded-full mr-1`} />
      <div className="text-sm font-inter text-neutral600 leading-none line-clamp-1 pr-2">
        {unavailableUntil ? "Unavailable for hire" : "Available to hire"}
      </div>
    </div>
  );
};

function FeedItem({ article, interest }) {
  const location = useLocation();
  const { isFavorited } = article;

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div
      className="group-0 bg-white rounded-[32px] shadow-feed p-6 md:p-8 flex flex-col lg:flex-row gap-10 items-start"
      data-walkthrough="feed-item"
      data-testid="feed-item"
    >
      <div>
        <div
          className="flex items-center gap-3 mb-4"
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
            article={article}
            className={`${!isFavorited && "hidden"} group-0-hover:flex ml-auto`}
          />
        </div>
        <Link
          to={`/articles/${article.slug || article.id}`}
          className="group"
          state={{ ...location.state, back: true }}
        >
          <h3 className="block text-xl md:text-[24px] md:leading-8 font-[560] tracking-tight mb-2.5 text-neutral900 group-hover:underline">
            {article.title}
          </h3>
          <p className="line-clamp-3 font-inter text-sm md:text-[15px] md:leading-relaxed text-neutral-600">
            {article.subtitle}
          </p>
        </Link>

        {interest && (
          <div className="pt-6">
            <Link
              onClick={scrollToTop}
              to={`/explore/${interest.id}`}
              className="border border-solid border-neutral200 rounded-full h-8 px-3 inline-flex items-center gap-0.5  text-sm leading-none text-neutral600 hover:text-neutral900"
            >
              <InterestIcon
                primaryColor="var(--color-neutral600)"
                className="w-5 min-w-[20px] h-5"
              />
              <p className="line-clamp-1">{interest.term}</p>
            </Link>
          </div>
        )}
      </div>
      <div className="bg-neutral-100 p-5 rounded-[24px] w-full lg:w-[240px] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0">
            <Favicon src={article.company?.favicon} />
          </div>
          <div className="flex flex-col min-w-0 w-full">
            <div className="font-medium leading-none pb-1 min-w-0 truncate">
              {article.company?.name || (
                <span className="text-neutral500">Company hidden</span>
              )}
            </div>
            <span className="text-xs font-inter leading-none text-neutral500 min-w-0 truncate">
              {article.company?.website || "Website hidden"}
            </span>
          </div>
        </div>
        <div className="hidden md:block border-t border-solid border-neutral200 mt-5 pt-5 space-y-5">
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
