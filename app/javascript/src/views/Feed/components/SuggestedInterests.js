import React from "react";
import { Link } from "react-router-dom";

const list = [
  "Long-Form Content Marketing",
  "Improve SEO Rankings",
  "Growth Marketing",
  "Video Content",
  "Implement Hubspot",
  "Create Brand Identity",
  "Growth Marketing",
  "Public Relations",
];

export default function SuggestedInterests() {
  return (
    <div className="flex flex-wrap gap-2.5 mt-6 py-1.5 items-stretch content-around">
      {list.map((item, index) => (
        <Link
          key={index}
          to={{ search: `?q=${item}` }}
          className="ring-1 ring-neutral200 rounded-full py-1.5 px-2.5 md:py-2.5 md:px-4 text-xs md:text-sm text-neutral900 bg-neutral50 opacity-90 hover:opacity-100"
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
