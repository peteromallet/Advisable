import React from "react";
import { useArticle } from "./queries";
import Loading from "src/components/Loading";
import SidebarCard from "./components/SidebarCard";
import ArticleIntro from "./components/ArticleIntro";
import Article from "./components/Article";

export default function ShortlistArticle() {
  const { data, loading, error } = useArticle();
  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex gap-20">
        <SidebarCard specialist={data.caseStudy.specialist} />
        <ArticleIntro caseStudy={data.caseStudy} />
      </div>
      <hr />
      <Article caseStudy={data.caseStudy} />
    </div>
  );
}
