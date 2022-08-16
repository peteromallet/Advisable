import { createElement } from "react";
import Chess from "src/icons/duo/chess";
import Coins from "src/icons/duo/coins";
import rocket from "src/icons/duo/rocket";
import target from "src/icons/duo/target";
import sliders from "src/icons/duo/sliders";
import multiply from "src/icons/duo/multiply";
import paintbrush from "src/icons/duo/paintbrush";
import lightbulb from "src/icons/duo/lightbulb";
import barchart from "src/icons/duo/barchart";
import gauge from "src/icons/duo/gauge";

const CATEGORY_ICONS = {
  revenue: Coins,
  "impact-1": target,
  "impact-2": gauge,
  "impact-3": lightbulb,
  "multiply-1": multiply,
  "multiply-2": barchart,
  creative: paintbrush,
  strategy: Chess,
  launch: rocket,
  optimise: sliders,
};

export default function ResultIcon({ category, ...props }) {
  return createElement(
    CATEGORY_ICONS[category] || CATEGORY_ICONS["impact-1"],
    props,
  );
}
