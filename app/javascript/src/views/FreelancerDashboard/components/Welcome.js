import React from "react";
import useViewer from "src/hooks/useViewer";
import GradientHighlight from "src/components/GradientHighlight";

export default function Welcome() {
  const viewer = useViewer();

  return (
    <div className="self-center">
      <p className="text-4xl text-neutral900 font-semibold tracking-tight">
        <GradientHighlight>Welcome back, </GradientHighlight>
        {viewer.firstName}
      </p>
    </div>
  );
}
