import React from "react";
import { Link } from "react-router-dom";
import { PlusSm } from "@styled-icons/heroicons-solid";

export default function FeedItem({ article }) {
  return (
    <div key={article.id} className="py-11 flex gap-11">
      <div>
        <div className="mb-4 flex gap-3">
          <div className="flex items-center">
            <div
              className="w-8 h-9 bg-neutral200 rounded-xs bg-cover -mr-1.5"
              style={{ backgroundImage: `url(${article.specialist.avatar})` }}
            />
            <div className="w-5 h-5 bg-white rounded-full shadow grid place-items-center z-20">
              <PlusSm className="w-4 h-4 text-neutral800" />
            </div>
            <div className="w-8 h-9 bg-neutral200 rounded-xs -ml-1.5">
              <img
                src={article.company?.favicon}
                className="w-full h-full rounded-xs object-cover"
              />
            </div>
          </div>
          <div className="leading-none">
            <div className="font-medium mb-0.5 text-neutral900">
              {article.specialist.name}
            </div>
            <div className="text-neutral600 text-sm">
              with {article.company?.name}
            </div>
          </div>
        </div>
        <Link
          to={`/feed/articles/${article.slug}`}
          className="block text-2xl font-semibold tracking-tight mb-3 text-blue900 hover:underline hover:cursor-pointer"
        >
          {article.title}
        </Link>
        {/* {article.company && (
          <div>
            <div className="flex items-center gap-2 pt-2 pb-4">
              <img
                src={article.company.favicon}
                className="w-5 h-5 rounded-xs"
              />
              <span className="font-medium text-sm">
                {article.company.name}
              </span>
            </div>
          </div>
        )} */}
        <p className="text-neutral800 leading-relaxed">{article.subtitle}</p>
      </div>

      {article.images.length > 0 && (
        <div
          className="w-[220px] h-[130px] bg-neutral200 shrink-0 rounded-xs"
          style={{
            background: `url(${article.images[0].url}) no-repeat center center / cover`,
          }}
        />
      )}
    </div>
  );
}
