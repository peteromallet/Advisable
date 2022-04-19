import React from "react";

export default function Availability({ unavailableUntil }) {
  const colour = unavailableUntil ? "bg-neutral600" : "bg-blue500";
  return (
    <div className="flex justify-items-center items-center">
      <div
        className={`h-2 xl:h-2.5 w-2 xl:w-2.5 ${colour} rounded-full mr-1.5 xl:mr-2`}
      />
      <div className="text-neutral600 leading-4 xl:leading-5 text-[15px] xl:text-lg font-[440]">
        {unavailableUntil ? "Unavailable for hire" : "Available for hire"}
      </div>
    </div>
  );
}
