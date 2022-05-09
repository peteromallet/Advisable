import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "src/components/Button";
import SearchIllustration from "src/illustrations/zest/search";

export default function NoResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="border-t border-solid border-neutral100 pt-5">
      <div className="max-w-[400px] mx-auto text-center">
        <SearchIllustration
          width="200px"
          className="mx-auto"
          primaryColor="var(--color-pink-100)"
        />
        <h4 className="font-medium mb-1">No matches for "{query}"</h4>
        <p className="text-neutral600 font-inter text-sm mb-6">
          We currently have no projects that match your search but we're
          constantly adding new projects.
        </p>
        <Link to="/explore/search">
          <Button variant="outlined" className="inline-flex">
            New search
          </Button>
        </Link>
      </div>
    </div>
  );
}
