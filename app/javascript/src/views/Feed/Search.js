import React from "react";
import { useSearchParams } from "react-router-dom";
import Searchbox from "./components/Searchbox";
import FeedContainer from "./components/FeedContainer";
import TrendingArticles from "./components/TrendingArticles";
import SearchResults from "./SearchResults";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (query) {
    return <SearchResults />;
  }

  return (
    <FeedContainer>
      <div className="pt-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Search for projects
        </h1>
        <p className="text-neutral800 mb-8 text-lg">
          Discover how leading marketers did their most impactful work, learn
          from their case studies and collaborate with the people behind them.
        </p>
        <Searchbox size="lg" autoFocus />
        <div className="pt-16 pb-12">
          <TrendingArticles />
        </div>
      </div>
    </FeedContainer>
  );
}
