import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LightBulb,
  MinusCircle,
  PlusCircle,
} from "@styled-icons/heroicons-solid";

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
            className="fill-neutral900 group-hover:fill-blue700"
          />
        ) : (
          <PlusCircle
            size="20px"
            className="fill-neutral900 group-hover:fill-blue700"
          />
        )}
        <div className="text-neutral900 font-medium line-clamp-1 group-hover:text-blue700">
          {title}
        </div>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            <p className="pb-4 text-neutral900">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KeyTakeaways() {
  const [activeTab, setActiveTab] = React.useState(null);
  const closeTab = () => setActiveTab(null);
  const openTab = (index) => setActiveTab(index);

  return (
    <div className="min-h-[320px]">
      <div className="flex gap-3 items-center border-b border-neutral100 border-solid pb-4">
        <LightBulb size="20px" className="fill-neutral900" />
        <div className="uppercase text-sm text-neutral900 font-semibold leading-none">
          Key Takeaways
        </div>
      </div>
      <Section
        index={0}
        isActive={activeTab === 0}
        closeTab={closeTab}
        openTab={openTab}
        title="Retargeting ads can be a quick win"
      >
        At first, the client wasn&apos;t doing anything with their
        bottom-of-the-funnel customers. The first thing I did was set up
        retargeting ads for them. With clients that haven&apos;t done any paid
        before, this is the first obvious step. You can often capture these
        customers for a reasonable price and build lookalike audiences from
        them.
      </Section>
      <Section
        index={1}
        isActive={activeTab === 1}
        closeTab={closeTab}
        openTab={openTab}
        title="Geo-targeting is a powerful tool"
      >
        At first, the client wasn&apos;t doing anything with their
        bottom-of-the-funnel customers. The first thing I did was set up
        retargeting ads for them. With clients that haven&apos;t done any paid
        before, this is the first obvious step. You can often capture these
        customers for a reasonable price and build lookalike audiences from
        them.
      </Section>
    </div>
  );
}
