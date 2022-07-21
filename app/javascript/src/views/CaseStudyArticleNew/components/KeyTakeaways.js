import {
  LightBulb,
  MinusCircle,
  PlusCircle,
} from "@styled-icons/heroicons-solid";
import React from "react";

function Section({ index, title, children, isActive, closeTab, openTab }) {
  return (
    <div>
      <div
        onClick={() => (isActive ? closeTab() : openTab(index))}
        className="flex"
      >
        {isActive ? <MinusCircle size="20px" /> : <PlusCircle size="20px" />}
        <div>{title}</div>
      </div>
      {isActive && <p>{children}</p>}
    </div>
  );
}

export default function KeyTakeaways() {
  const [activeTab, setActiveTab] = React.useState(null);
  const closeTab = () => setActiveTab(null);
  const openTab = (index) => setActiveTab(index);

  return (
    <div>
      <div className="flex gap-3 items-center">
        <LightBulb size="20px" />
        <div className="uppercase text-sm font-semibold leading-none">
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
        At first, the client wasn't doing anything with their
        bottom-of-the-funnel customers. The first thing I did was set up
        retargeting ads for them. With clients that haven't done any paid
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
        At first, the client wasn't doing anything with their
        bottom-of-the-funnel customers. The first thing I did was set up
        retargeting ads for them. With clients that haven't done any paid
        before, this is the first obvious step. You can often capture these
        customers for a reasonable price and build lookalike audiences from
        them.
      </Section>
    </div>
  );
}
