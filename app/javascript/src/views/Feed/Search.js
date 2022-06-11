import React from "react";
import { useSearchParams } from "react-router-dom";
import Searchbox from "./components/Searchbox";
import FeedContainer from "./components/FeedContainer";
import TrendingArticles from "./components/TrendingArticles";
import SearchResults from "./SearchResults";
import DiamondGrid from "./components/DiamondGrid";
import SuggestedInterests from "./components/SuggestedInterests";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (query) {
    return <SearchResults />;
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-800 to-violet-600 md:pt-20 pb-6 md:pb-14 relative overflow-hidden">
        <FeedContainer>
          <DiamondGrid
            className="absolute -right-[120px] -top-[110px] z-none"
            grid={[
              [null, null, "outlined", "outlined", null],
              [null, "solid", "solid", "solid", null],
              ["outlined", "solid", "outlined", "solid", "outlined"],
              [null, "outlined", "solid", "solid", null],
              [null, "outlined", "solid", null, null],
            ]}
          />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white leading-none">
              Discover new projects
            </h1>
            <p className="text-slate-100 mb-10 text-base md:text-xl max-w-[720px]">
              Discover how leading marketers did their most impactful work,
              learn from their case studies and collaborate with the people
              behind them.
            </p>
            <Searchbox size="lg" autoFocus />
            <SuggestedInterests />
          </div>
        </FeedContainer>
      </div>
      <FeedContainer></FeedContainer>
      <FeedContainer>
        <div className="pt-4 md:pt-16 pb-12">
          <TrendingArticles />
        </div>
      </FeedContainer>
    </>
  );
}
