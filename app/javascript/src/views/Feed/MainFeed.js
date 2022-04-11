import React from "react";
import { useFeed } from "./queries";

function FeedItem({ article }) {
  return (
    <div key={article.id} className="py-8 flex">
      <div className="w-[200px] h-[120px] bg-neutral200 shrink-0 rounded-sm"></div>
      <div className="pl-8">
        <h4 className="text-2xl font-semibold tracking-tight mb-2">
          {article.title}
        </h4>
        {article.company && (
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
        )}
        <p className="text-lg">{article.subtitle}</p>
      </div>
    </div>
  );
}

export default function MainFeed() {
  const { data, loading, error } = useFeed();

  if (loading) return null;

  const edges = data?.feed?.edges || [];
  const results = edges.map((n) => n.node);

  return (
    <div>
      <div className="divide-y divide-solid divide-neutral200">
        <h2 className="text-3xl font-semibold tracking-tight mb-5">Feed</h2>
        {results.map((result) => (
          <FeedItem key={result.id} article={result.article} />
        ))}
      </div>
    </div>
  );
}
