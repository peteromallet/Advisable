import React from "react";
import Coins from "src/icons/duo/coins";
import Chess from "src/icons/duo/chess";
import Multiply from "src/icons/duo/multiply";
import Paintbrush from "src/icons/duo/paintbrush";
import Rocket from "src/icons/duo/rocket";
import Sliders from "src/icons/duo/sliders";
import Target from "src/icons/duo/target";
import Gauge from "src/icons/duo/gauge";
import Lightbulb from "src/icons/duo/lightbulb";
import Barchart from "src/icons/duo/barchart";

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
const GaugeIcon = (props) => (
  <Gauge fill="white" stroke="white" bg="transparent" {...props} />
);
const LightbulbIcon = (props) => (
  <Lightbulb fill="transparent" stroke="white" {...props} />
);
const BarchartIcon = (props) => (
  <Barchart fill="transparent" stroke="white" bg="transparent" {...props} />
);

const CATEGORY_ICONS = {
  revenue: CoinsIcon,
  "impact-1": TargetIcon,
  "impact-2": GaugeIcon,
  "impact-3": LightbulbIcon,
  "multiply-1": MultiplyIcon,
  "multiply-2": BarchartIcon,
  creative: PaintbrushIcon,
  strategy: ChessIcon,
  launch: RocketIcon,
  optimise: SlidersIcon,
};

export default function Results({ results }) {
  if (!results?.length) return null;
  const filtered = results.filter((result) => result.callout);
  const firstTwo = filtered.slice(0, 2);

  const resultCards = firstTwo.map((result, index) => {
    const Icon = CATEGORY_ICONS[result.category] || CATEGORY_ICONS["impact-1"];

    return (
      <div key={`result-${index}`}>
        <div className="flex gap-3 items-start mb-2">
          {Icon && (
            <div className="min-w-[24px] w-[24px] h-[24px]">
              <Icon />
            </div>
          )}
          <div>
            <h5 className="mb-1 text-xl font-semibold leading-6 text-white">
              {result.callout}
            </h5>
            <p className="text-sm leading-relaxed text-white">
              {result.context}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full shadow-xl bg-gradient-to-b from-[#0082FD] to-[#692FFF] rounded-lg p-5 pb-8 mb-8">
      <div className="mb-4 text-xs font-semibold leading-none text-white uppercase">
        Results
      </div>
      <div className="space-y-7">{resultCards}</div>
    </div>
  );
}
