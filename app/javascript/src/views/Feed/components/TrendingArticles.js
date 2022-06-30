import React from "react";
import { Link, useLocation } from "react-router-dom";
import SpecialistCompanyRelation from "src/views/CaseStudyArticle/components/SpecialistCompanyRelation";
import useTrending from "../queries";

function CaseStudyCard({ article }) {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation || location;
  return (
    <Link to={article.path} state={{ backgroundLocation }}>
      <div className="w-full h-[320px] rounded-lg bg-white shadow-lg p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
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
  const { data } = useTrending();
  const articles = data?.topCaseStudies || [];

  return (
    <>
      <h4 className="text-xl font-medium mb-4 tracking-tight">
        Trending projects
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <CaseStudyCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
