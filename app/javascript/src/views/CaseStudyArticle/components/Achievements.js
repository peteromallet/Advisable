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
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[32px] text-slate-400 leading-8 font-[550]">
            {index + 1}
          </span>
          <div>
            <span className="text-xs leading-3 text-slate-300 font-[550] uppercase">
              {NUM_TO_WORD[index]} achievement
            </span>
            <p className="text-xl text-gray-900">{achievement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
