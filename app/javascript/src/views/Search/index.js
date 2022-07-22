import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useCreateSearch } from "./queries";
import CaseStudyGrid from "../Explore/CaseStudyGrid";
import ScrollToTop from "../Explore/ScrollToTop";
import Footer from "src/components/Footer";

export default function Search() {
  const location = useLocation();
  const { search } = location?.state?.backgroundLocation || location;
  const query = queryString.parse(search).q;
  const [createSearch, { data, loading }] = useCreateSearch();

  useEffect(() => {
    createSearch({
      variables: {
        input: {
          term: query,
        },
      },
    });
  }, [createSearch, query]);

  const isLoading = loading && !data;
  const interestPreview = data?.createCaseStudyInterestPreview?.interestPreview;
  const edges = interestPreview?.articles?.edges || [];
  const results = edges.map((e) => e.node);
  const hasResults = results.length > 0;

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 pb-10">
        <ScrollToTop />
        <div className="py-8">
          <CaseStudyGrid loading={loading} results={results} />
        </div>
      </div>
      <Footer />
    </>
  );
}
