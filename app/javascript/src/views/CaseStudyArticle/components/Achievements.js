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
          className="flex items-start gap-3 mb-6"
        >
          <div className="text-[32px] text-neutral400 leading-6 pt-1  font-[550]">
            {index + 1}
          </div>
          <div>
            <div className="text-xs leading-4 text-neutral300 font-[550] uppercase">
              {NUM_TO_WORD[index]} achievement
            </div>
            <p className="text-xl text-neutral900 leading-6 pt-px pb-[3px]">
              {achievement}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
