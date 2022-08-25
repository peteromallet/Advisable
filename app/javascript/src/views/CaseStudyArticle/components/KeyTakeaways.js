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
        className="flex gap-2 items-center py-4 cursor-pointer group"
      >
        {isActive ? (
          <MinusCircle
            size="20px"
            className="fill-neutral900 min-w-[20px] group-hover:fill-blue700"
          />
        ) : (
          <PlusCircle
            size="20px"
            className="fill-neutral900 min-w-[20px] group-hover:fill-blue700"
          />
        )}
        <div className="font-semibold text-neutral900 line-clamp-1 group-hover:text-blue700">
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
              open: { opacity: 1, height: "auto", y: -8 },
              collapsed: { opacity: 0, height: 0, y: -8 },
            }}
          >
            <p className="pb-4 text-neutral-600">{children}</p>
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

  insights = insights?.filter((i) => i.description && i.title);
  if (!insights?.length) return null;

  return (
    <div className="mb-8">
      <div className="flex gap-2 items-center pb-4 border-b border-solid border-neutral100">
        <LightBulb size="20px" className="fill-neutral-600" />
        <div className="text-sm font-semibold leading-none uppercase text-neutral-600">
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
