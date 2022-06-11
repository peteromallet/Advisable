import React from "react";
import { Link } from "react-router-dom";

const list = [
  "Scale Performance Marketing",
  "Creative PR Strategy",
  "Start B2B Podcast",
  "Long-Form Content Marketing",
  "Creative Growth Marketing",
  "Test Instagram Ads",
  "Improve SEO Rankings",
  "Develop Value Proposition",
];

export default function SuggestedInterests() {
  return (
    <div className="flex flex-wrap gap-2.5 mt-6 py-1.5 items-stretch content-around">
      {list.map((item, index) => (
        <Link
          key={index}
          to={{ search: `?q=${item}` }}
          className="ring-1 ring-neutral200 rounded-full py-2.5 px-4 text-sm text-neutral900 bg-neutral50 opacity-90 hover:opacity-100"
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
