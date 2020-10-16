import NoResults from "./NoResults";
import Freelancers from "./Freelancers";

function SearchResults({ data }) {
  if (data.search.results.nodes.length === 0) {
    return <NoResults data={data} />;
  }

  return <Freelancers data={data} />;
}

export default SearchResults;
