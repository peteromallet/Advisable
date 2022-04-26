import React from "react";
import FeedItem from "src/views/Feed/components/FeedItem";

export default function SimilarArticles({ articles, ...props }) {
  return (
    <div className="pt-12 border-t border-solid border-neutral100" {...props}>
      <h4 className="mb-5 text-2xl font-medium tracking-tight">
        Similar projects
      </h4>
      <div className="space-y-6">
        {articles.map((article) => (
          <FeedItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
