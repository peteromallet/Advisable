import React from "react";
import Avatar from "src/components/Avatar";
import { Chat } from "@styled-icons/heroicons-outline";
import CircularButton from "src/components/CircularButton";

export default function SpecialistBar({ specialist, modal, isOwner }) {
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

      {!specialist.unavailableUntil && !isOwner && (
        <div className="shrink-0">
          <CircularButton
            color="blue"
            aria-label="Contact"
            icon={Chat}
            onClick={modal.show}
          />
        </div>
      )}
    </div>
  );
}
