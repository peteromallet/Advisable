import React from "react";
import Coins from "src/icons/duo/coins";
import Chess from "src/icons/duo/chess";
import Multiply from "src/icons/duo/multiply";
import Paintbrush from "src/icons/duo/paintbrush";
import Rocket from "src/icons/duo/rocket";
import Sliders from "src/icons/duo/sliders";
import Target from "src/icons/duo/target";

const ChessIcon = (props) => (
  <Chess fill="white" stroke="white" bg="transparent" {...props} />
);
const CoinsIcon = (props) => (
  <Coins stroke="white" fill="transparent" {...props} />
);
const TargetIcon = (props) => (
  <Target stroke="white" fill="transparent" bg="transparent" {...props} />
);
const MultiplyIcon = (props) => (
  <Multiply stroke="white" fill="transparent" {...props} />
);
const PaintbrushIcon = (props) => (
  <Paintbrush fill="transparent" stroke="white" {...props} />
);
const RocketIcon = (props) => (
  <Rocket fill="transparent" stroke="white" bg="transparent" {...props} />
);
const SlidersIcon = (props) => (
  <Sliders fill="transparent" stroke="white" bg="transparent" {...props} />
);

const CATEGORY_ICONS = {
  "Strategy Development": ChessIcon,
  "More Revenue": CoinsIcon,
  "Big Impact": TargetIcon,
  "Big Win": TargetIcon,
  "Number Multiplying": MultiplyIcon,
  "Increasing Number": MultiplyIcon,
  "Create Something": PaintbrushIcon,
  "New Launch": RocketIcon,
  "Optimising Something": SlidersIcon,

  strategy: ChessIcon,
  revenue: CoinsIcon,
  impact: TargetIcon,
  multiply: MultiplyIcon,
  creative: PaintbrushIcon,
  launch: RocketIcon,
  optimise: SlidersIcon,
};

export default function Results({ results }) {
  if (!results) return null;

  const resultCards = results.map((result, index) => {
    const Icon = CATEGORY_ICONS[result.category] || CATEGORY_ICONS["optimise"];
    if (!result.callout) return null;

    return (
      <div key={`result-${index}`}>
        <div className="flex gap-2 mb-2 items-start">
          {Icon && (
            <div className="min-w-[24px] w-[24px] h-[24px]">
              <Icon />
            </div>
          )}
          <div className="text-white text-xl leading-6 font-semibold">
            {result.callout}
          </div>
        </div>
        <div className="text-white">{result.context}</div>
      </div>
    );
  });

  return (
    <div className="w-[280px] bg-gradient-to-b from-[#0082FD] to-[#692FFF] rounded-lg p-5 pb-8 mb-8">
      <div className="leading-none mb-4 uppercase text-xs font-semibold text-white">
        Results
      </div>
      <div className="space-y-7">{resultCards}</div>
    </div>
  );
}
