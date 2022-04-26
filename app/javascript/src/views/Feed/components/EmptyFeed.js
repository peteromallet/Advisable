import React from "react";
import { Link } from "react-router-dom";

export default function EmptyFeed() {
  return (
    <div className="bg-neutral50 p-8 rounded-[32px] max-w-400px mx-auto text-center">
      <h4 className="font-semibold">No results</h4>
      <p>It looks, like you haven't added any interests yet.</p>
      <Link to="/setup" className="text-blue600 hover:text-blue700">
        Setup interests
      </Link>
    </div>
  );
}
