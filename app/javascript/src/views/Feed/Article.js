import React from "react";
import { useParams } from "react-router-dom";
import CaseStudyContent from "src/components/CaseStudyContent";
import { useArticle } from "./queries";

export default function Article() {
  const { slug } = useParams();
  const { data, loading } = useArticle({ variables: { slug } });

  if (loading) return <>loading...</>;

  return (
    <>
      <CaseStudyContent caseStudy={data.caseStudy} />
    </>
  );
}
