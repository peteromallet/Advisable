import React, { createElement } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Avatar from "src/components/Avatar";
import FavoriteButton from "./FavoriteButton";
import composeStyles from "src/utilities/composeStyles";
import Chess from "src/icons/duo/chess";
import Coins from "src/icons/duo/coins";
import rocket from "src/icons/duo/rocket";
import target from "src/icons/duo/target";
import sliders from "src/icons/duo/sliders";
import multiply from "src/icons/duo/multiply";
import paintbrush from "src/icons/duo/paintbrush";

const CATEGORY_ICONS = {
  strategy: Chess,
  revenue: Coins,
  impact: target,
  multiply,
  creative: paintbrush,
  launch: rocket,
  optimise: sliders,
};

function Result({ category, callout, context }) {
  return (
    <li className="flex gap-4">
      <div className="icon-duo-neutral">
        {createElement(CATEGORY_ICONS[category] || CATEGORY_ICONS.strategy, {
          width: 24,
          stroke: "var(--color-neutral-700)",
          fill: "var(--color-neutral-200)"
        })}
      </div>
      <div>
        <h5 className="mb-1 font-semibold leading-none">{callout}</h5>
        <p className="font-light text-neutral-600">{context}</p>
      </div>
    </li>
  );
}

const skillClasses = composeStyles({
  base: "mb-1 text-xs font-medium uppercase",
  variants: {
    color: {
      red: "text-red-700",
      orange: "text-orange-700",
      amber: "text-amber-700",
      green: "text-green-700",
      emerald: "text-emerald-700",
      teal: "text-teal-700",
      cyan: "text-cyan-700",
      blue: "text-blue-700",
      indigo: "text-indigo-700",
      violet: "text-violet-700",
      pink: "text-pink-700",
    },
  },
});

export default function CaseStudyCard({ article, delay }) {
  const location = useLocation();
  const results = (article.resultsContent?.results || []).slice(0, 2);

  return (
    <div className="w-full h-[500px] bg-white rounded-xl shadow-md p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col h-full"
      >
        <Link
          to={article.path}
          state={{
            backgroundLocation: location?.state?.backgroundLocation || location,
          }}
          className="case-study-card-content"
        >
          {article.primarySkill && (
            <div
              className={skillClasses({ color: article.primarySkill.color })}
            >
              {article.primarySkill.name}
            </div>
          )}
          <h4 className="font-serif text-[22px] font-semibold tracking-tight mb-8 leading-snug">
            {article.title}
          </h4>

          <ul className="space-y-8">
            {results.map((r, i) => (
              <Result
                key={i}
                callout={r.callout}
                context={r.context}
                category={r.category}
              />
            ))}
          </ul>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <Avatar
              size="xs"
              src={article.specialist.avatar}
              name={article.specialist.name}
            />
            <span className="font-medium">{article.specialist.name}</span>
          </div>
          <div>
            <FavoriteButton article={article} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
