import React from "react";
import ArticleContent from "./ArticleContent";
import ArticleSidebar from "./ArticleSidebar";

export default function Article({ caseStudy }) {
  return (
    <div className="flex gap-20">
      <ArticleSidebar caseStudy={caseStudy} />
      <ArticleContent caseStudy={caseStudy} />
    </div>
  );
}
