import React from "react";
import { Clock, ArrowUp } from "@styled-icons/feather";
import { motion } from "framer-motion";
import { Card } from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import {
  hoursLabel,
  displayTaskQuote,
  hoursCost,
  hasBeenSubmitted,
} from "../../../utilities/tasks";
import {
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
  DetailPlaceholder,
  ArrowPrompt,
} from "../styles";
import QuoteInputPopout from "./QuoteInputPopout";
import useViewer from "../../../hooks/useViewer";

const QuoteInput = ({ task, readOnly, onSubmit }) => {
  const viewer = useViewer();
  const popover = usePopoverState({ placement: "bottom-start" });

  return (
    <>
      <PopoverDisclosure
        as={Detail}
        disabled={readOnly}
        readOnly={readOnly}
        aria-label="Set estimate"
        {...popover}
      >
        {!viewer.isClient && task.stage === "Quote Requested" && (
          <ArrowPrompt>
            <ArrowUp size={24} strokeWidth={2} />
          </ArrowPrompt>
        )}
        <DetailIcon
          prompt={!viewer.isClient && task.stage === "Quote Requested"}
        >
          <Clock />
        </DetailIcon>
        <DetailLabel>{hoursLabel(task)}</DetailLabel>
        {task.estimate ? (
          <DetailValue>
            {displayTaskQuote(task)}
            {task.estimateType === "Hourly" &&
              !hasBeenSubmitted(task) &&
              ` / ${hoursCost(task)}`}
          </DetailValue>
        ) : (
          <DetailPlaceholder>+ Add estimate</DetailPlaceholder>
        )}
      </PopoverDisclosure>
      <Popover
        {...popover}
        aria-label="Quote"
        style={{ width: "100%", maxWidth: 320, outline: "none", zIndex: 999 }}
      >
        <Card
          padding="m"
          elevation="xl"
          as={motion.div}
          animate={{
            y: popover.visible ? 0 : 20,
            opacity: popover.visible ? 1 : 0,
          }}
        >
          {popover.visible && (
            <QuoteInputPopout
              task={task}
              onCancel={popover.hide}
              onSuccess={popover.hide}
            />
          )}
        </Card>
      </Popover>
    </>
  );
};

export default QuoteInput;
