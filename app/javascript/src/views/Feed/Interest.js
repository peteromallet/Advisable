import React from "react";
import { useParams } from "react-router-dom";
import { useInterest } from "./queries";
import FeedItem from "./components/FeedItem";

export default function Interest() {
  const { interest: id } = useParams();
  const { data, loading, error } = useInterest({ variables: { id } });

  if (loading) return <>loading...</>;
  const results = data.interest.articles.edges.map((e) => e.node);

  return (
    <div className="divide-y divide-solid divide-neutral200">
      <h2 className="text-3xl font-semibold tracking-tight mb-5">
        {data.interest.term}
      </h2>
      {results.map((result) => (
        <FeedItem key={result.id} article={result} />
      ))}
    </div>
  );
}
