import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LightBulb,
  MinusCircle,
  PlusCircle,
} from "@styled-icons/heroicons-solid";
import { useBreakpoint } from "@advisable/donut";

function Section({ index, title, children, isActive, closeTab, openTab }) {
  return (
    <div className="border-b border-solid border-neutral100">
      <div
        onClick={() => (isActive ? closeTab() : openTab(index))}
        className="flex gap-3 cursor-pointer py-4 items-center group"
      >
        {isActive ? (
          <MinusCircle
            size="20px"
            className="fill-neutral900 group-hover:fill-blue700 min-w-[20px]"
          />
        ) : (
          <PlusCircle
            size="20px"
            className="fill-neutral900 group-hover:fill-blue700 min-w-[20px]"
          />
        )}
        <div className="text-neutral900 font-medium line-clamp-1 group-hover:text-blue700">
          {title}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            className="overflow-hidden"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.2 }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <p className="pb-4 text-neutral900">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KeyTakeaways({ insights }) {
  const isDesktop = useBreakpoint("mUp");
  const [activeTab, setActiveTab] = React.useState(isDesktop ? 0 : null);
  const closeTab = () => setActiveTab(null);
  const openTab = (index) => setActiveTab(index);

  insights = insights.filter((insight) => insight.description && insight.title);
  if (insights.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex gap-3 items-center border-b border-neutral100 border-solid pb-4">
        <LightBulb size="20px" className="fill-neutral900" />
        <div className="uppercase text-sm text-neutral900 font-semibold leading-none">
          Key Takeaways
        </div>
      </div>
      {insights.map((insight, index) => (
        <Section
          key={insight.id}
          index={index}
          isActive={activeTab === index}
          closeTab={closeTab}
          openTab={openTab}
          title={insight.title}
        >
          {insight.description}
        </Section>
      ))}
    </div>
  );
}
