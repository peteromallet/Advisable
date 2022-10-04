import React from "react";
import Avatar from "src/components/Avatar";

export default function SpecialistBar({ specialist }) {
  return (
    <div className="lg:hidden flex items-center gap-3 border-b border-t border-solid border-neutral-200 py-4 mb-4">
      <div className="shrink-0">
        <Avatar src={specialist.avatar} name={specialist.name} />
      </div>
      <div className="w-full">
        <h4 className="leading-none font-semibold mb-1 line-clamp-1">
          {specialist.name}
        </h4>
        <p className="leading-none text-sm text-neutral-700 line-clamp-1 pb-0.5">
          {specialist.location}
        </p>
      </div>
    </div>
  );
}
