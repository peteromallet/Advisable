import React from "react";
import GradientHighlight from "src/components/GradientHighlight";

export default function Hero() {
  return (
    <div className="py-32 bg-blue-100 mb-2">
      <div className="max-w-[1300px] mx-auto px-5 lg:px-10">
        <div className="max-w-[720px]">
          <h1 className="text-6xl text-blue900 font-bold tracking-tight mb-6">
            Explore the <GradientHighlight>
            world's best marketing projects
            </GradientHighlight>
          </h1>
          <p className="max-w-[600px] text-blue900 text-xl leading-relaxed">
            Marketers showcase their best projects on Advisable - the home to
            the world's best marketing and growth professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
