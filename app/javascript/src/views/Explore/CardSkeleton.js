import React from "react";
import { forwardClassName } from "src/utilities/forwardClassName";

function Pulse({ className }) {
  const classes = forwardClassName(
    "bg-neutral-100 animate-pulse rounded-sm",
    className,
  );

  return <div className={classes} />;
}

export default function CardSkeleton() {
  return (
    <div data-testid="casestudy-card-skeleton" className="w-full h-[500px] bg-white rounded-xl shadow-md p-6 flex flex-col">
      <Pulse className="w-[120px] h-3 mb-4" />
      <Pulse className="h-5 mb-3" />
      <Pulse className="h-5 mb-3" />
      <Pulse className="w-1/2 h-5 mb-2" />
      <div className="flex gap-4 pt-8">
        <Pulse className="w-8 h-8" />
        <div className="flex-1">
          <Pulse className="w-[160px] h-3 mb-3" />
          <Pulse className="h-3 mb-3" />
          <Pulse className="h-3 mb-3" />
          <Pulse className="w-[100px] h-3 mb-3" />
        </div>
      </div>

      <div className="flex gap-4 pt-8">
        <Pulse className="w-8 h-8" />
        <div className="flex-1">
          <Pulse className="w-[160px] h-3 mb-3" />
          <Pulse className="h-3 mb-3" />
          <Pulse className="h-3 mb-3" />
          <Pulse className="w-[100px] h-3 mb-3" />
        </div>
      </div>
    </div>
  );
}
