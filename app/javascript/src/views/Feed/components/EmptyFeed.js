import React from "react";
import { Link } from "react-router-dom";

export default function EmptyFeed() {
  return (
    <div className="bg-neutral50 p-8 rounded-[32px] max-w-[500px] mx-auto text-center">
      <h4 className="font-semibold">No results</h4>
      <p className="mb-4">
        It looks like you haven&apos;t added any interests yet. Search for
        something to add an interest.
      </p>
      <Link to="/explore/search" className="text-blue600 hover:text-blue700">
        New search
      </Link>
    </div>
  );
}
