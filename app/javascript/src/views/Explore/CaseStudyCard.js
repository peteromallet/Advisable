import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Avatar from "src/components/Avatar";
import FavoriteButton from "./FavoriteButton";
import composeStyles from "src/utilities/composeStyles";
import ResultIcon from "src/components/ResultIcon";

function Result({ category, callout, context }) {
  return (
    <li className="flex gap-4">
      <div className="icon-duo-neutral">
        <ResultIcon
          category={category}
          width={24}
          stroke="var(--color-blue900)"
          fill="var(--color-slate-200)"
        />
      </div>
      <div>
        <h5 className="font-semibold leading-snug">{callout}</h5>
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

function primarySkillForArticle(article) {
  const primarySkill = article.skills.find((skill) => skill.primary);
  if (!primarySkill) return article.skills[0]?.skill;
  return primarySkill.skill;
}

export default function CaseStudyCard({ article, delay }) {
  const location = useLocation();
  const resultsWithContent = (article.resultsContent?.results || []).filter(
    (c) => c.callout && c.context,
  );
  const results = resultsWithContent.slice(0, 2);
  const primarySkill = primarySkillForArticle(article);

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      data-testid={`article-card-${article.id}`}
      variants={{ hover: { y: -4 }, tap: { scale: 0.95 } }}
      transition={{ duration: 0.2 }}
      className="w-full h-[500px] relative"
    >
      <motion.div
        initial={{
          boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.12)",
        }}
        variants={{
          hover: {
            scale: 1.01,
            boxShadow: "0 8px 60px -12px rgba(0, 0, 0, 0.16)",
          },
          tap: {
            scale: 1,
          },
        }}
        className="absolute inset-0 bg-white rounded-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className="rounded-xl overflow-hidden flex flex-col h-full relative"
      >
        <Link
          to={article.path}
          state={{
            backgroundLocation: location?.state?.backgroundLocation || location,
          }}
          className="no-tap-highlight rounded-xl p-6 case-study-card-content"
        >
          {primarySkill && (
            <div className={skillClasses({ color: primarySkill.color })}>
              {primarySkill.name}
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

        <div className="flex p-5 items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <Avatar
              size="xs"
              src={article.specialist.avatar}
              name={article.specialist.name}
            />
            <span className="font-medium">{article.specialist.name}</span>
          </div>
          <div>
            <FavoriteButton article={article} size="sm" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
