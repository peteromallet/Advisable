import { ChartBar, TrendingUp } from "@styled-icons/heroicons-outline";
import React from "react";

export default function Results({ results }) {
  if (!results) return null;

  return (
    <div className="w-[280px] bg-gradient-to-b from-[#0082FD] to-[#692FFF] rounded-lg p-5 pb-8 mb-8">
      <div className="leading-none mb-4 uppercase text-xs font-semibold text-white">
        Results
      </div>
      <div className="space-y-7">
        <div>
          <div className="flex gap-2 mb-2">
            <ChartBar size={24} className="stroke-white" />
            <div className="text-white text-2xl leading-none font-semibold">
              $400,000
            </div>
          </div>
          <div className="text-white">{results[0]}</div>
        </div>
        <div>
          <div className="flex gap-2 mb-2">
            <TrendingUp size={24} className="stroke-white" />
            <div className="text-white text-2xl leading-none font-semibold">
              145%
            </div>
          </div>
          <div className="text-white">{results[1]}</div>
        </div>
      </div>
    </div>
  );
}
