import React from "react";

const NUM_TO_WORD = ["first", "second", "third", "fourth", "fifth", "sixth"];

export default function Achievements({ sections }) {
  const achievements = sections
    .find((s) => s.type === "outcome")
    .contents.find((c) => c.__typename === "Results").results;

  return (
    <div>
      {achievements.map((achievement, index) => (
        <div
          key={`achievement-${index}`}
          className="flex items-start gap-2 mb-6 last:mb-0"
        >
          <div className="text-[28px] xl:text-[32px] leading-none text-neutral400 font-[550] text-center">
            {index + 1}
          </div>
          <div>
            <div className="text-[11px] leading-3 py-0.5 mt-1 xl:text-xs text-neutral400 font-[550] uppercase tracking-wider">
              {NUM_TO_WORD[index]} achievement
            </div>
            <p className="text-base leading-5 py-0 sm:text-lg sm:leading-6 sm:pt-px sm:pb-[3px] xl:text-xl xl:leading-7 xl:pt-[3px] xl:pb-px text-neutral900 ">
              {achievement}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
