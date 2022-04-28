import React from "react";
import { useSearchParams } from "react-router-dom";
import Searchbox from "src/components/Searchbox";
import FeedContainer from "./components/FeedContainer";
import SearchResults from "./SearchResults";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (query) {
    return <SearchResults />;
  }

  return (
    <FeedContainer>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
        Search for projects
      </h1>
      <p className="text-neutral800 mb-8 text-lg">
        Discover how other companies solved their problems and achieved their
        goals.
      </p>
      <Searchbox size="lg" autoFocus />
    </FeedContainer>
  );
}
