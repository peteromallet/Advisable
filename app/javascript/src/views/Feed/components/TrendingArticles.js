import React from "react";
import { Link } from "react-router-dom";
import SpecialistCompanyRelation from "src/views/CaseStudyArticle/components/SpecialistCompanyRelation";
import useTrending from "../queries";

function CaseStudyCard({ article }) {
  return (
    <Link to={article.path} state={{ back: true }}>
      <div className="w-full max-w-[320px] h-[320px] rounded-md bg-white shadow-lg p-5">
        <SpecialistCompanyRelation
          company={article.company}
          specialist={article.specialist}
        />
        <h5 className="uppercase text-xs tracking-loose font-medium mb-1 text-neutral600">
          {article.specialist.name}
        </h5>
        <h4 className="text-lg font-medium tracking-tight leading-snug">
          {article.title}
        </h4>
      </div>
    </Link>
  );
}

export default function TrendingArticles() {
  const { loading, data } = useTrending();
  const articles = data?.topCaseStudies || [];

  return (
    <>
      <h4 className="text-lg font-medium mb-4">Trending projects</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <CaseStudyCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
