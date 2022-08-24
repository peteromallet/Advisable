import React from "react";
import CaseStudyCard from "src/views/Explore/CaseStudyCard";

export default function SimilarArticles({ articles, onClick, ...props }) {
  return (
    <div className="pt-12 border-t border-solid border-neutral100" {...props}>
      <h4 className="mb-5 text-2xl font-medium tracking-tight">
        Similar projects
      </h4>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {articles.map((article) => (
          <CaseStudyCard key={article.id} article={article} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}
