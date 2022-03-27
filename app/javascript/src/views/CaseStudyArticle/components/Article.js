import React from "react";
import ArticleContent from "./ArticleContent";
import ArticleSidebar from "./ArticleSidebar";

export default function Article({ caseStudy }) {
  return (
    <div>
      <ArticleSidebar />
      <ArticleContent />
    </div>
  );
}
